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
  userInfo.requiresHomeAssessment =  false;
  return new Promise((resolve, reject) => {
    db.collection('users').doc(data.id).set(userInfo)
      .then(() => resolve()) // Successful, resolve with nothing
      .catch(() => reject(new functions.https.HttpsError("internal", "Could not update user type"))); // Failed, reject promise with HTTP error message
  });
})
