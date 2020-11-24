let taskDefaults = require("../tasks.json")
let dateFormat = require("dateformat");

let requiresCalculatedDueDate = new Map([
  ["BIG Chat", 7],
  ["BIG Supporters - Family/Partner", 30],
  ["BIG Supporters - Personal", 30],
  ["BIG Supporters - Employer", 30],
  ["BIG Fundamentals", 60],
  ["BIG Extras - Car Insurance", 60],
  ["BIG Bio", 60]
])

dateFormat.i18n = {
  dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ],
  monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ],
  timeNames: [
      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
  ]
};

module.exports = {
    getDefaultTasks: () => {
        let tasks = [];

        taskDefaults.forEach(task => {
            let dueDate;
            if (requiresCalculatedDueDate.has(task.name)) {
              let daysUntilDue = requiresCalculatedDueDate.get(task.name);
              let calculatedDueDate = new Date().setDate(new Date().getDate() + daysUntilDue);
              dueDate = dateFormat(calculatedDueDate, "dddd, mmmm dS, yyyy, h:MM:ss TT");
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

          return tasks;
    }
};

