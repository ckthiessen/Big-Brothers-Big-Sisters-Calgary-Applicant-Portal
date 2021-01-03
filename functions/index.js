const functions = require('firebase-functions');
const admin = require('firebase-admin');
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
      reject(new functions.https.HttpsError("internal", "Could not get all users"))
    }
  })
});
