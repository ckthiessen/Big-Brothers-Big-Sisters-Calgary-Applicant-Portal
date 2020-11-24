//firebase initialization
const admin = require('firebase-admin');
const serviceAccount = require('./credentials/firebaseCredentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {
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
    const snapshot = await db.collection('users').where('id','==',id).get();
    return snapshot.data();    
  }
};
