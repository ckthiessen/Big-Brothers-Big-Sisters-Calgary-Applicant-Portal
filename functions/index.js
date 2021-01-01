const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors({ origin: true }));

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

exports.getAllUsers = functions.https.onRequest((request, response) => {
  db.collection('users').get().then(userSnapshot => {
    const users = [];
    userSnapshot.forEach(userSnap => {
      const data = userSnap.data();
      users.push(data);
    })
    return response.status(200).send(users);
  }).catch((error) => {
    console.log(error);
    return response.status(500).send(error);
  });
})

// exports.fn = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {
//         // your function body here - use the provided req and res from cors
//     })
// });

exports.getUserUsingID = functions.https.onCall((data, context) => {
  console.log(data.id);
  return new Promise();
  // db.collection('users').doc(id).get()
  //   .then(snapshot => {
  //     const user = snapshot.data();
  //     return new Promise(user);
  //   }).catch((error) => {
  //     console.log(error);
  //     return new Promise(error);
  //   });
});

// exports.getUserUsingID = functions.https.onRequest((request, response) => {
//   console.log(request);
//   console.log("this is something")
//   const id = request.query.id;
//   console.log(id)
//   //const id = 'bF1ix2kLHugbIF4T5eiZi85SX5u2';
//   db.collection('users').doc(id).get()
//     .then(snapshot => {
//       const user = snapshot.data();
//       return response.status(200).send(user);
//     }).catch((error) => {
//       console.log(error);
//       return response.status(500).send(error);
//     });
// });
