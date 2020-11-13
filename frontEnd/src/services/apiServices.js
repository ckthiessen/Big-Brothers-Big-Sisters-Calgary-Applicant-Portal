// import axios from "axios"

export async function getAllUsers() {
  const response = await fetch('/api/users');
  return await response.json();
}
