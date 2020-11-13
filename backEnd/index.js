const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = 3080;

// place holder for the data
const users = [];
const test = "hey this is from the server :)"

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  //res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
  res.json(test);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

// Upadating a user info 
app.patch("/users/:id?info=true", () => {});

// Update user task
app.patch("/users/:id?activity=true", () => {}); 

// Update user task
app.patch("/users/isAdmin=true", () => {}); 

// Create a user by id
app.post("users/:id", () => {});

// Delete user by id
app.delete("users/:id", () => {});

// Get all users for searching. Client will filter the array that is returned
app.get("/users", () => {});

// Get users by id (has possible query parameters)
app.get("/users/:id", () => {});