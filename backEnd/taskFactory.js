//this class builds and generates the default tasks when creating a user
let taskDefaults = require("./tasks.json")

//these are the tasks that require calculated due dates
let requiresCalculatedDueDate = new Map([
  ["BIG Chat", 7],
  ["BIG Supporters - Family/Partner", 30],
  ["BIG Supporters - Personal", 30],
  ["BIG Supporters - Employer", 30],
  ["BIG Fundamentals", 60],
  ["BIG Extras - Car Insurance", 60],
  ["BIG Bio", 60]
])

//module exported 
module.exports = {
    getDefaultTasks: () => {
        let tasks = [];

        taskDefaults.forEach(task => {
            let dueDate;
            if (requiresCalculatedDueDate.has(task.name)) {
              let daysUntilDue = requiresCalculatedDueDate.get(task.name);
              let calculatedDueDate = new Date().setDate(new Date().getDate() + daysUntilDue);
              dueDate = new Date(calculatedDueDate).toDateString() //changed so it does not keep track of time
            } else {
              dueDate = task.dueDate;
            }
            tasks.push({
              name: task.name,
              fileUpload: task.fileUpload,
              dueDate: dueDate,
              isApproved: task.isApproved,
              isSubmitted: task.isSubmitted,
            })
          });

          return tasks;
    }
};

