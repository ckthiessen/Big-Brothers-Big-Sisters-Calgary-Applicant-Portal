//firebase initialization
const admin = require('firebase-admin');
const serviceAccount = require('./credentials/firebaseCredentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


module.exports = {
  
  createUser: async function(toCreate) {
    console.log('createUser: ' + toCreate);
    let created = await db.collection('users').doc(toCreate.id).set(toCreate);
    console.log('created user: ' + created);
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
      console.log(doc.id, '=>', doc.data());
      users.push(doc.data());
    });
    return users;
  },
  getUserById: async function(id) {
    console.log('getAllUsers');
    const found = db.collection('users').doc(id);
    const doc = await found.get();
    if (doc.exists) {
      return doc.data();    
    }
    throw "Not Found";
  }
};
