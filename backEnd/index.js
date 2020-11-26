const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require("body-parser");
const port = 3080;


// place holder for the data
const users = [{
  "id": 1,
  "name": "Himika Dastidar",
  "email": "Test@Testing.com",
  "notifications": [],
  "isAdmin": false,
  "isCommunityMentor": false,
  "requiresHomeAssessment": false,
  "tasks": [
    {
      "name": "BIG Profile",
      "dueDate": "2020-05-09",
      "isSubmitted": true,
      "isApproved": false,
      "upload": null,
    },
    {
      "name": "BIG Chat",
      "dueDate": "2020-05-09",
      "isSubmitted": false,
      "isApproved": false,
    },
    {
      "name": "BIG Supporters - Family",
      "dueDate": "2020-05-09",
      "isSubmitted": false,
      "isApproved": false,
      "upload": true
    },
    {
      "name": "BIG Supporters - Friend",
      "dueDate": "2020-05-09",
      "isSubmitted": true,
      "isApproved": true,
    },
    {
      "name": "BIG Supporters - Mentor",
      "dueDate": "2020-05-09",
      "isSubmitted": false,
      "isApproved": false,
    },
  ]
},
{
  "id": 2,
  "name": "Cole Theissen",
  "email": "Test2@Testing.com",
  "notifications": [],
  "isAdmin": false,
  "isCommunityMentor": false,
  "requiresHomeAssessment": false,
  "tasks": [
    {
      "name": "BIG Profile",
      "dueDate": "2020-05-09",
      "isSubmitted": true,
      "isApproved": true,
      "upload": null,
    },
    {
      "name": "BIG Chat",
      "dueDate": "2020-05-09",
      "isSubmitted": true,
      "isApproved": true,
    },
    {
      "name": "BIG Supporters - Family",
      "dueDate": "2020-05-09",
      "isSubmitted": false,
      "isApproved": false,
    },
    {
      "name": "BIG Supporters - Friend",
      "dueDate": "2020-05-09",
      "isSubmitted": false,
      "isApproved": false,
    },
    {
      "name": "BIG Supporters - Mentor",
      "dueDate": "2020-05-09",
      "isSubmitted": false,
      "isApproved": false,
    },
  ] 
}
];

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
app.get('/api/users', (req, res) => {
  console.log("get all users")
  //todo: Get users from Firebase
  res.json(users);
});

// Gets a user by id - id is "path parameter"
// sends a single user up to the client
app.get("/api/users/:id", (req, res) => {
  let id = req.params.id;
  console.log("Get user by ID: /users/:" + id);
  //todo: Search user by ID in firebase and return that
  res.json(users[0]);
});

// Create a user by id
// receives a json from the client
app.post("/api/users", (req, res) => {
  let newUser = req.body;

  let tasks = []
  let taskDefaults = require("./tasks.json")

  let requiresCalculatedDueDate = new Map([
    ["BIG Chat", 7],
    ["BIG Supporters - Family/Partner", 30],
    ["BIG Supporters - Personal", 30],
    ["BIG Supporters - Employer", 30],
    ["BIG Fundamentals", 60],
    ["BIG Extras - Car Insurance", 60],
    ["BIG Bio", 60]
  ])

  taskDefaults.forEach(task => {
    let dueDate;
    if (requiresCalculatedDueDate.has(task.name)) {
      let daysUntilDue = requiresCalculatedDueDate.get(task.name);
      let calculatedDueDate = new Date();
      calculatedDueDate.setDate(calculatedDueDate.getDate() + daysUntilDue);
      dueDate = calculatedDueDate.toLocaleDateString("en-CA", {
        timeZone: "America/Edmonton"
      });
    } else {
      dueDate = task.dueDate;
    }
    tasks.push({
      name: task.name,
      fileUpload: null,
      dueDate: dueDate,
      isApproved: task.isApproved,
      isSubmitted: false,
    })
  });

  let accountCreationDate = new Date();
  let notificationDate = accountCreationDate.toLocaleDateString("en-CA", {
    timeZone: "America/Edmonton"
  });

  //TODO: Add new user to firebase. Currently adds to server RAM
  applicants.push({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    password: newUser.password, // TODO: Salt and hash the password or make this work with firebase authentication
    notifications: [
      {
        message: "Congratulations on making your account!",
        date: notificationDate
      }
    ],
    isAdmin: false,
    isCommunityMentor: false,
    requiresHomeAssessment: false,
    tasks
  })
  console.log(applicants)
  res.json(newUser.id + " was created")
});

// Delete user by id
// receives a user ID to delete from client
app.delete("/api/users/:id", (req, res) => {
  let id = req.params.id;
  console.log("Delete User by ID: /users/:" + id);
  //todo: find user in firebase and delete
  res.json(id + " was deleted");
});

// Update user task - this can be called by the admin OR user
// receives a json from the client
app.put("/api/users", (req, res) => {
  let updatedUser = req.body;
  console.log("Updating user");
  console.log(updatedUser);
  //todo: Update user in Firebase
  res.json(updatedUser);
}); 