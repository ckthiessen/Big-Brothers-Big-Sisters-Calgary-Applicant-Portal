import axios from "axios"
import firebase from "firebase";

//client side function for getting all users - no params needed
export async function getAllUsers() {
  // const response = await axios.get('/api/users');
  let response = firebase.functions('https://us-central1-bbbs-applicant-portal.cloudfunctions.net/getAllUsers');
  return await response;
}
//client side function for getting single user by ID - pass in user's ID
export async function getUserByID(id) {
  let response = firebase.functions().httpsCallable('getUserUsingID');
  let user = await response({ id });
  console.log(user.data);
  return user.data;
  // let response = firebase.functions(`https://localhost:5000/bbbs-applicant-portal/us-central1/getUserUsingID/:${id}`);
  // return await response;
}

export async function createUser(user){
  const response = await axios.post('/api/users', user);
  return await response;
}

export async function firebaseTest(messageText) {
  let addMessage = firebase.functions().httpsCallable('addMessage');
  let result = await addMessage({ text: messageText });
  return result.data.msg;
}

//client side function for deleting a user by ID - pass in user's ID
export async function deleteUserByID(id) {
  const response = await axios.delete('/api/users/' + id);
  return await response;
}

//client side function for updating a user (profile or ID) (admin or user)
//pass in the user json object
export async function updateUser(user){
  const response = await axios.put('/api/users', user);
  return await response;
}

//client side function for getting a user by EMAIL
//Used for logging in
//If the response received is a 401 error, then the user is unauthorized because their password is mismatched
export async function getUserByEmail(body){
  const response = await axios.post('/api/users/login', body );
  return await response;
}

//client side function for updating an applicant's task status
//pass in the user json object
export async function updateTask(id, tasks, selectedTask){
  const response = await axios.patch('/api/users', { id, tasks, selectedTask });
  return await response;
}