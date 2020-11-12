// Upadating a user info 
app.patch("/users/:id?info=true", (req, res) => {});

// Update user task
app.patch("/users/:id?activity=true", (req, res) => {}); 

// Update user task
app.patch("/users/isAdmin=true", (req, res) => {}); 

// Create a user by id
app.post("users/:id", (req, res) => {});

// Delete user by id
app.delete("users/:id", (req, res) => {});

// Get all users for searching. Client will filter the array that is returned
app.get("/users", (req, res) => {});

// Get users by id (has possible query parameters)
app.get("/users/:id", (req, res) => {});