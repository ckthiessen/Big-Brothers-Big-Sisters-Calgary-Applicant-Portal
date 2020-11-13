const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = 3080;

// place holder for the data
const users = [{"id": 1, "name": "Himika", 
"userType": "Admin", "Email": "Test@Testing.com",
"Activities": {
  "dueDate":"2020-05-09",
  "isSubmitted": false,
  "isApproved": false,
}}];

/*
ID, Name, Email, Activities, userType {
  task {

    dueDate:
    isSubmitted,
    isApproved
  }
}
*/

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});


//below are the API methods, matched with apiServices in the Front End
//NOTE: requires firebase integration, uses "users" variable for testing

// Get all users for searching. Client will filter the array that is returned
app.get('/api/users', (req, res) => {
  console.log("get all users")
  res.json(users);
});

// Gets a user by id - id is "path parameter"
app.get("/api/users/:id", (req,res) => {
  let id = req.params.id;
  console.log("Get user by ID: /users/:" + id);
  res.json(users[0]);
});

// Create a user by id
app.post("/api/users", (req,res) => {
  let newUser = req.body;
  console.log("Creating user");
  console.log(newUser);
  res.json(newUser);
});

// Updating a user info 
app.patch("/users/:id?info=true", () => {});

// Update user task
app.patch("/users/:id?activity=true", () => {}); 

// Update user task
app.patch("/users/isAdmin=true", () => {}); 


// Delete user by id
app.delete("users/:id", () => {});
