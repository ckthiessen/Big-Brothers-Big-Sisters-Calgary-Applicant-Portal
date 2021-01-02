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