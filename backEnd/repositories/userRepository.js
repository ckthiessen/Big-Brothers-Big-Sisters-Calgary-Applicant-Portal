//firebase initialization
const admin = require('firebase-admin');
const serviceAccount = require('../credentials/firebaseCredentials.json');

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

  updateUser: async function(toUpdate) {
    console.log('updating user: ');
    console.log(toUpdate);
    await db.collection('users').doc(toUpdate.id).update(toUpdate);
    console.log('user: ' + toUpdate.id + ' updated.');
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
    console.log('getuserbyID');
    const found = db.collection('users').doc(id);
    const doc = await found.get();
    if (doc.exists) {
      return doc.data();    
    }
    throw "Not Found";
  },

  getUserbyEmail: async function(body){
    console.log('getuserbyEmail');
    console.log(body);
    const found = db.collection('users').where('email', '==', body.email);
    const doc = await found.get();
    if(doc.empty){
      console.log("nothing found")
      throw "Not Found"
    }

    let user = undefined;
    doc.forEach(each => {
      console.log(each.id, "=>", each.data());
      user = each.data();
    })
  
    return user;
  },

  authenticateUser: async function(body){
    let user = await this.getUserbyEmail(body);
    //checks if the password matches
    if(user.password !== body.password){
      throw "Invalid Password"
    }
    return user;

  }

};
