import axios from "axios"

//client side function for getting all users - no params needed
export async function getAllUsers() {
  const response = await axios.get('/api/users');
  return await response;
}
//client side function for getting single user by ID - pass in user's ID
export async function getUserByID(id) {
  const response = await axios.get('/api/users/' + id);
  return await response;
}

export async function createUser(user){
  const response = await axios.post('/api/users', { user });
  return await response;
}

//client side function for deleting a user by ID - pass in user's ID
export async function deleteUserByID(id) {
  const response = await axios.delete('/api/users/' + id);
  return await response;
}
//client side function for updating a user (profile or ID) (admin or user)
//pass in the user json object
export async function updateUser(user){
  const response = await axios.put('/api/users', { user });
  return await response;
}
