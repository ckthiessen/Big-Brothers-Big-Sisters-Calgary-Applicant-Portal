const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = 3080;
const userRepository = require('./repositories/userRepository');
const taskFactory = require('./tasks/taskFactory');
const userValidator = require('./validations/userValidator');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(cors());

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

//API helper functions here
async function isEmailUnqiue(userToCheck,res){
  //called on a create and therefore he will NOT be in the db
  try{
    let found = await userRepository.getUserbyEmail(userToCheck);
    //if we found a user with this email already
    console.log(found.id);
    console.log(userToCheck.id);
    //found yourself already in the system, so it is an update
    if(found.id === userToCheck.id){
      return true;
    }
    //if the ID's didn't match, then your trying to create a user with a non-unique email
    console.log("error 409");
    res.status(409);
    res.json("error user with email " + found.email + " already exists")
    return false;
  //we didn't find the user
  }
  catch(error){
    //didn't find the User
    return true
  }
}

// Get all users for searching. Client will filter the array that is returned
// sends list of users up to the client
app.get('/api/users', async (req, res) => {
  try{
    console.log("get all users")
    let users = await userRepository.getAllUsers();
    res.json(users);
  }
  catch(error) {
    console.log('error' + error);
    res.status(404); //not found error
    res.json(error);
  }
});

//Gets a user by Email - used for logging in
//sends a single user up to client
//if a 401 is thrown, then the user entered the incorrect password

app.post('/api/users/login', async(req,res) =>{
  let body = req.body;
  try {
    userValidator.validateLogin(body);

    console.log("get user by email: /api/users/login");
    let found = await userRepository.authenticateUser(body);
    console.log(found);
    res.json(found);
  }
  catch(error){
    console.log('error' + error);
    res.status(401); //unauthorized
    res.json(error);
  }
});


// Gets a user by id - id is "path parameter"
// sends a single user up to the client
app.get("/api/users/:id", async (req,res) => {
  let id = req.params.id;
  try {
    userValidator.validateId(id);

    console.log("Get user by ID: /users/:" + id);
    let found = await userRepository.getUserById(id);
    console.log(found);
    res.json(found);
  }
  catch(error) {
    console.log('error' + error);
    res.status(404); //user not found
    res.json(error);
  }
});

// Create a user by id
// receives a json from the client
//assumes that the json received includes: email, Name, Password and ID
app.post("/api/users", async (req, res) => {
  let toCreate = req.body;
  try {
    userValidator.validateUser(toCreate);

    //if the email already exists then throw 409 and return
    if( await isEmailUnqiue(toCreate,res) === false ){
      return;
    }

    toCreate.tasks =  taskFactory.getDefaultTasks();
    // password: newUser.password, // TODO: Salt and hash the password or make this work with firebase authentication
    toCreate.notifications = [
      {
        messzage: "Congratulations on making your account!",
        date: new Date().toLocaleDateString("en-CA", { timeZone: "America/Edmonton" })
      }
    ];
    toCreate.isAdmin = false;
    toCreate.isCommunityMentor = false;
    toCreate.requiresHomeAssessment =  false;
      
    await userRepository.createUser(toCreate); 
    res.json(toCreate.id)
  }
  catch(error) {
    console.log('error' + error);
    res.status(400);
    res.json(error);
  }
});

// Delete user by id
// receives a user ID to delete from client
app.delete("/api/users/:id", async (req,res) => {
  let id = req.params.id;
  console.log("Delete User by ID: /users/:" + id);
  try {
    userValidator.validateDelete(id);
    await userRepository.deleteUser(id);
    res.json(id + " was deleted");
  }
  catch(error) {
    console.log('error' + error);
    res.status(400);
    res.json(error);
  }
});

// Update user - this can be called by the admin OR user
// receives a json from the client
app.put("/api/users", async (req,res) => {
  let toUpdate = req.body;
  console.log(toUpdate);
  try {
    userValidator.validateUser(toUpdate);

    //if the email already exists then throw 409 and return
    //unless the email that already exists is you
    //add false to an update
    if( await isEmailUnqiue(toUpdate,res) === false ){
      return;
    }

    console.log("Updating user");
    console.log(toUpdate);
    await userRepository.updateUser(toUpdate);
    res.json(toUpdate);
  }
  catch(error) {
    console.log('error' + error);
    res.status(400);
    res.json(error);
  }
});

// Update existing user's task 
// Triggered when applicant marks an item complete
app.patch("/api/users", async (req, res) => {
  let userID = req.body.id;

  try {
    userValidator.validateId(userID);
    console.log("ID Valid");

    await userRepository.updateTask(userID, req.body.tasks, req.body.selectedTask);
    res.json();
  }
  catch(error) {
    console.log('error' + error);
    res.status(400);
    res.json(error);
  }
});
