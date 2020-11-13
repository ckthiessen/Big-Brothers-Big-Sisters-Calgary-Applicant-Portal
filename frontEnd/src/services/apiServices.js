// import axios from "axios"

//client side function for getting all users
export async function getAllUsers() {
  const response = await fetch('/api/users');
  return await response.json();
}
//client side function for getting single user by ID
export async function getUserByID(id) {
  const response = await fetch('/api/users/' + id);
  return await response.json();
}
//client side function for creating a user
export async function createUser(user){
  const response = await fetch('/api/users',
    {
      method: 'POST',
      body: JSON.stringify(user)
    }
  );
  return await response.json();
}
