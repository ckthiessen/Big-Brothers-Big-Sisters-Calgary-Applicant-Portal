const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = 3080;

// place holder for the data
const users = [{"id": 1, "name": "Himika", 
"userType": "Admin", "Email": "Test@Testing.com",
"Activities": [
     {
      "taskName": "Big Project",
      "dueDate":"2020-05-09",
      "isSubmitted": false,
      "isApproved": false,
    },
    {
      "taskName": "Big Thing",
      "dueDate":"2020-05-09",
      "isSubmitted": false,
      "isApproved": false,
    }
  ],
"Notifications": [
  {
    "taskName": "Big Thing"
  },
  {
    "taskName": "Big Project"
  }
]
}];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});


//below are the API methods, matched with apiServices in the Front End
//NOTE: requires firebase integration, uses "users" variable for testing

// Get all users for searching. Client will filter the array that is returned
// sends list of users up to the client
app.get('/api/users', (req, res) => {
  console.log("get all users")
  //todo: Get users from Firebase
  res.json(users);
});

// Gets a user by id - id is "path parameter"
// sends a single user up to the client
app.get("/api/users/:id", (req,res) => {
  let id = req.params.id;
  console.log("Get user by ID: /users/:" + id);
  //todo: Search user by ID in firebase and return that
  res.json(users[0]);
});

// Create a user by id
// receives a json from the client
app.post("/api/users", (req,res) => {
  let newUser = req.body;
  console.log("Creating user");
  console.log(newUser);
  //todo: Add new user to firebase
  res.json(newUser);
});

// Delete user by id
// receives a user ID to delete from client
app.delete("/api/users/:id", (req,res) => {
  let id = req.params.id;
  console.log("Delete User by ID: /users/:" + id);
  //todo: find user in firebase and delete
  res.json(id + " was deleted");
});

// Update user task - this can be called by the admin OR user
// receives a json from the client
app.put("/api/users", (req,res) => {
  let updatedUser = req.body;
  console.log("Updating user");
  console.log(updatedUser);
  //todo: Update user in Firebase
  res.json(updatedUser);
}); 