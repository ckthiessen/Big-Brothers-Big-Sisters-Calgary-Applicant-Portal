const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
const users = [];
const test = "hey this is from the server :)"

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(cors());

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user added");
});

app.get('/', (req,res) => {
  //res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
  res.json(test);
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});