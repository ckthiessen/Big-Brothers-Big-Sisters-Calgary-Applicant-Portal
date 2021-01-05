const functions = require('firebase-functions');
const admin = require('firebase-admin');
const tasks = require('./tasks.json');
const taskFactory = require('./taskFactory');
admin.initializeApp();

const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.updateNotifications = functions.firestore.document('users/{userID}').onUpdate((change, context) => {
  const before = change.before.data();
  const after = change.after.data();

  let length = after.notification.length;
  //capping notification length?
  if (before.notification !== after.notification) {
    console.log("notifications has been updated");
    //return a boolean? or a promise?
    //best option may be to update an attribute with when notifications were last updated/when someone sends you a notification?
    // return change.after.ref.update({'lastUpdated' : Date.now()}, {merge: true});
  } else {
    return null;
  }
});

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage = functions.https.onCall((data) => {
  // Message text passed from the client.
  const text = data.text;
  // returning result.
  return {
    msg: text
  };
});

// Sets the boolean "isCommunityMentor" in Cloud Firestore based on data passed in
exports.updateApplicantType = functions.https.onCall((data, context) => {
  if (!context.auth.uid) { throw new functions.https.HttpsError("unauthenticated", "User not authenticated"); }
  return new Promise((resolve, reject) => {
    db.collection('users').doc(data.id).update({
      isCommunityMentor: data.isCommunityMentor
    })
      .then(() => resolve()) // Successful, resolve with nothing
      .catch(() => reject(new functions.https.HttpsError("internal", "Could not update user type"))); // Failed, reject promise with HTTP error message
  });
});

/**
 * Gets a user from cloud firestore by their ID 
 * @param { Object } data - The body of the firebase function request
 * @param { String } data.id - The ID of the user being requested
 * @param { Object } context - Object containing metadata about the request 
 */
exports.getUserByID = functions.https.onCall((data, context) => {
  if (!context.auth.uid) { throw new functions.https.HttpsError("unauthenticated", "User not authenticated"); }
  return new Promise((resolve, reject) => {
    db.collection('users').doc(data.id).get()
      .then(doc => resolve(doc.data())) // Successful, resolve with user document
      .catch(() => reject(new functions.https.HttpsError("internal", "Could not get user"))); // Failed, reject promise with HTTP error message
  });
});

/**
 * Get all users from the database including applicants and administrators
 * @return {Promise} containing a list of user objects if it resolves or an error upon rejection
 * @param { Object } data - unused
 * @param { Object } context - Object containing metadata about the request 
 */
exports.getAllUsers = functions.https.onCall((data, context) => {
  if (!context.auth.uid) { throw new functions.https.HttpsError("unauthenticated", "User not authenticated"); }
  return new Promise(async (resolve, reject) => {
    try {
      let usersSnapshot = await db.collection('users').get();
      let users = usersSnapshot.docs.map(usersSnapshot => usersSnapshot.data());
      resolve(users);
    } catch (err) {
      reject(new functions.https.HttpsError("internal", "Could not get all users"));
    }
  });
});
/**
 * Creates a user in cloud firestore
 * @param { Object } data - The body of the firebase function request containing the new user's data
 */
exports.createUser = functions.https.onCall(async (data) => {
  let userInfo = data;
  userInfo.tasks = taskFactory.getDefaultTasks();
  userInfo.isAdmin = false;
  userInfo.isCommunityMentor = false;
  userInfo.requiresHomeAssessment = false;
  try {
    await sendNotificationByID(userInfo.id, "Congratulations on making your account!");
  } catch (err) {
    throw new functions.https.HttpsError("internal", "Could not create user (failed to create notifications)"); // Failed, reject promise with HTTP error message
  }
  return new Promise((resolve, reject) => {
    db.collection('users').doc(userInfo.id).set(userInfo)
      .then(() => resolve())
      .catch(() => reject(new functions.https.HttpsError("internal", "Could not create user"))); // Failed, reject promise with HTTP error message
  });
});

/**
 * Update the tasks array of an applicant when they mark a task submitted
 * @param { Object } data - The body of the firebase function request
 * @param { String } data.id - The ID of the applicant whose tasks are being updated
 * @param { String } data.serverTasks - The new tasks to replace the existing tasks in firestore
 * @param { Object } context - Object containing metadata about the request 
 */
exports.applicantUpdateTasks = functions.https.onCall((data, context) => {
  if (!context.auth.uid) { throw new functions.https.HttpsError("unauthenticated", "User not authenticated"); }
  let id = data.id;
  return new Promise((resolve, reject) => {
    db.collection('users').doc(id).update({
      "tasks": data.serverTasks
    })
      .then(async () => {
        try {
          await sendNotificationToAdmins(data.notification);
          resolve();
        }
        catch (err) {
          reject(new functions.https.HttpsError("internal", "Updated status but could not send notification"));
        }
      })
      .catch(() => reject(new functions.https.HttpsError("internal", "Could not update status")));
  });
});

/**
 * Update the tasks array of an applicant when an admin approves a task
 * @param { Object } data - The body of the firebase function request
 * @param { String } data.id - The ID of the applicant whose tasks are being updated
 * @param { String } data.serverTasks - The new tasks to replace the existing tasks in firestore
 * @param { Object } context - Object containing metadata about the request 
 */
exports.adminUpdateTasks = functions.https.onCall((data, context) => {
  if (!context.auth.uid) { throw new functions.https.HttpsError("unauthenticated", "User not authenticated"); }
  return new Promise((resolve, reject) => {
    db.collection('users').doc(data.id).update({
      "tasks": data.serverTasks
    })
      .then(async () => {
        try {
          sendNotificationByID(data.id, data.notification);
          resolve();
        }
        catch (err) {
          reject(new functions.https.HttpsError("internal", "Updated status but could not send notification"));
        }
      })
      .catch(() => reject(new functions.https.HttpsError("internal", "Could not update status")));
  });
});

/**
 * Produces a list of document snapshots containing admins
 */
function getAllAdmins() {
  return db.collection('users').where("isAdmin", "==", true).get();
}

/**
 * Sends a notification to all admins
 * @param { String } notification - The notification message to all admins
 */
async function sendNotificationToAdmins(notification) {
  let adminsSnapshot = await getAllAdmins();
  let adminIDs = adminsSnapshot.docs.map(doc => doc.data().id);

  adminIDs.forEach(adminID => sendNotificationByID(adminID, notification));
}

/**
 * Sends a notification to a user by ID
 * @param { String } notification - The notification message to the user
 * @param { String } id - The ID of the user receiving the notification
 */
function sendNotificationByID(id, notification) {
  return db.collection('users').doc(id).collection("notifications").add(
    {
      message: notification,
      date: new Date().toLocaleDateString("en-CA", { timeZone: "America/Edmonton" })
    });
};
