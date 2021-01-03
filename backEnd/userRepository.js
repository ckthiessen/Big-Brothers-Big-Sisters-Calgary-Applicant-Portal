//firebase initialization
const admin = require('firebase-admin');
const serviceAccount = require('../backEnd/credentials/firebaseCredentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

//This file should be obscure after everything is ported over

module.exports = {
  createUser: async function(toCreate) {
    console.log('createUser: ' + toCreate);
    let created = await db.collection('users').doc(toCreate.id).set(toCreate);
    console.log('created user: ' + created);
  },

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

  deleteUser: async function(idToDelete) {
    console.log('delete User: ' + idToDelete);
    let success = await db.collection('users').doc(idToDelete).delete();

    console.log('Deleted user: ' + success);
  },

  //search functions
  getAllUsers: async function () {
    console.log('getAllUsers');
    var users = [];
    const snapshot = await db.collection('users').get();
    snapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  },
};
