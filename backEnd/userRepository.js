//firebase initialization
const admin = require('firebase-admin');
const serviceAccount = require('../backEnd/credentials/firebaseCredentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//This file should be obscure after everything is ported over

module.exports = {
<<<<<<< HEAD:backEnd/repositories/userRepository.js
  // has been ported over to functions
  // createUser: async function(toCreate) {
  //   console.log('createUser: ' + toCreate);
  //   let created = await db.collection('users').doc(toCreate.id).set(toCreate);
  //   console.log('created user: ' + created);
  // },
=======
  createUser: async function(toCreate) {
    console.log('createUser: ' + toCreate);
    let created = await db.collection('users').doc(toCreate.id).set(toCreate);
    console.log('created user: ' + created);
  },
>>>>>>> 3c5bb5a32f76733b74c984e10b1f45b7eee518ab:backEnd/userRepository.js

  updateUser: async function(toUpdate) {
    console.log('updating user: ');
    console.log(toUpdate);
    await db.collection('users').doc(toUpdate.id).update(toUpdate);
    console.log('user: ' + toUpdate.id + ' updated.');
  },
  
  updateTask: async function(applicantID, newTasks, notifMessage) {
    console.log(`updating user: ${applicantID}`);
    let applicantDocRef = await db.collection('users').doc(applicantID);
    applicantDocRef.update({
      "tasks": newTasks
    });
    let applicant = await this.getUserById(applicantID);

    let adminIDs = await this.getAllAdmins();
    adminIDs.forEach(adminID => {
      db.collection('users').doc(adminID).update({
          notifications: admin.firestore.FieldValue.arrayUnion({
            message: notifMessage,
            date: new Date().toLocaleString()
          })
        })
    })
    console.log('user: ' + applicant.name + ' updated.');
  },

<<<<<<< HEAD:backEnd/repositories/userRepository.js
  // ported over to firebase functions
  // getAllAdmins: async function() {
  //   let adminIDs = []
  //   await db.collection('users').where("isAdmin", "==", true).get()
  //   .then(querySnapshot => {
  //     querySnapshot.forEach(adminSnapshot => {
  //       adminIDs.push(adminSnapshot.data().id);
  //     })
  //   });
  //   return adminIDs; 
  // }, 
=======
  getAllAdmins: async function() {
    let adminIDs = []
    await db.collection('users').where("isAdmin", "==", true).get()
    .then(querySnapshot => {
      querySnapshot.forEach(adminSnapshot => {
        adminIDs.push(adminSnapshot.data().id);
      })
      return;
    });
    return adminIDs; 
  }, 
>>>>>>> 3c5bb5a32f76733b74c984e10b1f45b7eee518ab:backEnd/userRepository.js

  deleteUser: async function(idToDelete) {
    console.log('delete User: ' + idToDelete);
    let success = await db.collection('users').doc(idToDelete).delete();

    console.log('Deleted user: ' + success);
  },

  //search functions
<<<<<<< HEAD:backEnd/repositories/userRepository.js
  //has been ported over to functions
  // getAllUsers: async function () {
  //   console.log('getAllUsers');
  //   var users = [];
  //   const snapshot = await db.collection('users').get();
  //   snapshot.forEach((doc) => {
  //     users.push(doc.data());
  //   });
  //   return users;
  // },

  getUserById: async function(id) {
    console.log('getuserbyID');
    console.log(id)
    const found = db.collection('users').doc(id);
    const doc = await found.get();
    if (doc.exists) {
      return doc.data();
    }
    throw "Not Found";
  },

  // getUserbyEmail: async function(body){
  //   console.log('getuserbyEmail');
  //   console.log(body);
  //   const found = db.collection('users').where('email', '==', body.email);
  //   const doc = await found.get();
  //   if(doc.empty){
  //     console.log("nothing found")
  //     throw "Not Found"
  //   }

  //   let user = undefined;
  //   doc.forEach(each => {
  //     console.log(each.id, "=>", each.data());
  //     user = each.data();
  //   })
  
  //   return user;
  // },

  // authenticateUser: async function(body){
  //   let user = await this.getUserbyEmail(body);
  //   //checks if the password matches
  //   if(user.password !== body.password){
  //     throw "Invalid Password"
  //   }
  //   return user;

  // }

=======
  getAllUsers: async function () {
    console.log('getAllUsers');
    var users = [];
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  },
>>>>>>> 3c5bb5a32f76733b74c984e10b1f45b7eee518ab:backEnd/userRepository.js
};
