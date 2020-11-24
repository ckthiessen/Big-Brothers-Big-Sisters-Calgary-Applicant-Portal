const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = 3080;
const userRepository = require('./userRepository');
const taskFactory = require('./taskFactory');

let applicants = []

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
app.get('/api/users', async (req, res) => {
  console.log("get all users")
  let users = await userRepository.getAllUsers();
  res.json(users);
});

// Gets a user by id - id is "path parameter"
// sends a single user up to the client
app.get("/api/users/:id", async (req,res) => {
  let id = req.params.id;
  console.log("Get user by ID: /users/:" + id);
  //todo: Search user by ID in firebase and return that
  res.json(users[0]);
});

// Create a user by id
// receives a json from the client
app.post("/api/users", async (req, res) => {
  let toCreate = req.body;
  let tasks = taskFactory.getDefaultTasks();
  let notificationDate = new Date().toLocaleDateString("en-CA", { timeZone: "America/Edmonton" });

  console.log('newUser:');
  console.log(req.body);

    // password: newUser.password, // TODO: Salt and hash the password or make this work with firebase authentication
    toCreate.notifications = [
      {
        message: "Congratulations on making your account!",
        date: notificationDate
      }
    ];
    toCreate.isAdmin = false;
    toCreate.isCommunityMentor = false;
    toCreate.requiresHomeAssessment =  false;
    toCreate.tasks = tasks;
  console.log(toCreate);
  await userRepository.createUser(toCreate);
  res.json(toCreate.id + " was created")
});

// Delete user by id
// receives a user ID to delete from client

app.delete("/api/users/:id", async (req,res) => {
  let id = req.params.id;
  console.log("Delete User by ID: /users/:" + id);
  //todo: find user in firebase and delete
  res.json(id + " was deleted");
});

// Update user - this can be called by the admin OR user
// receives a json from the client
app.put("/api/users", async (req,res) => {
  let updatedUser = req.body;
  console.log("Updating user");
  console.log(updatedUser);
  //todo: Update user in Firebase
  res.json(updatedUser);
}); 