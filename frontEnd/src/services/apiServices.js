// import axios from "axios"

//client side function for getting all users - no params needed
export async function getAllUsers() {
  const response = await fetch('/api/users');
  return await response.json();
}
//client side function for getting single user by ID - pass in user's ID
export async function getUserByID(id) {
  const response = await fetch('/api/users/' + id);
  return await response.json();
}
//client side function for creating a user - pass in the user json object
export async function createUser(user){
  const response = await fetch('/api/users',
    {
      method: 'POST',
      body: JSON.stringify(user)
    }
  );
  return await response.json();
}
//client side function for deleting a user by ID - pass in user's ID
export async function deleteUserByID(id) {
  const response = await fetch('/api/users/' + id,
    {
      method: 'DELETE',
    }
  );
  return await response.json();
}
//client side function for updating a user (profile or ID) (admin or user)
//pass in the user json object
export async function updateUser(user){
  const response = await fetch('/api/users',
    {
      method: 'PUT',
      body: JSON.stringify(user)
    }
  );
  return await response.json();
}