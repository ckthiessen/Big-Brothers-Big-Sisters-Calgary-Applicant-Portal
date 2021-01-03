const functions = require('firebase-functions');
const admin = require('firebase-admin');
const tasks = require('./tasks.json');
const taskFactory = require('./taskFactory');
admin.initializeApp();

const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage = functions.https.onCall((data) => {
  // Message text passed from the client.
  const text = data.text;
  // returning result.
  return {
    msg: text
  };
});


// Gets user by ID passed into data from firestore 
exports.getUserByID = functions.https.onCall((data, context) => {
  if (!context.auth.uid) { throw new functions.https.HttpsError("unauthenticated", "User not authenticated"); }
  return new Promise((resolve, reject) => {
    db.collection('users').doc(data.id).get()
      .then(doc => resolve(doc.data())) // Successful, resolve with user document
      .catch(() => reject(new functions.https.HttpsError("internal", "Could not get user"))); // Failed, reject promise with HTTP error message
  });
});

exports.createUser = functions.https.onCall((data, context) => {
  let userInfo = data;
  userInfo.tasks = taskFactory.getDefaultTasks();
  userInfo.notifications = [
    {
      message: "Congratulations on making your account!",
      date: new Date().toLocaleDateString("en-CA", { timeZone: "America/Edmonton" })
    }
  ];
  userInfo.isAdmin = false;
  userInfo.isCommunityMentor = false;
  userInfo.requiresHomeAssessment = false;
  return new Promise((resolve, reject) => {
    db.collection('users').doc(data.id).set(userInfo)
      .then(() => resolve()) // Successful, resolve with nothing
      .catch(() => reject(new functions.https.HttpsError("internal", "Could not create user"))); // Failed, reject promise with HTTP error message
  });
});

exports.updateTask = functions.https.onCall((data, context) => {
  if (!context.auth.uid) { throw new functions.https.HttpsError("unauthenticated", "User not authenticated"); }
  let id = data.id;
  return new Promise((resolve, reject) => {
    db.collection('users').doc(id).update({
      "tasks": data.newTasks
    })
      .then(() => resolve()) // Successful, resolve with nothing
      .catch(() => reject(new functions.https.HttpsError("internal", "Could not update task"))); // Failed, reject promise with HTTP error message
  });
});