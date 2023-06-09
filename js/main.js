let newTask = new TaskManager();
var displayedAlert = false;

// This is to check whether the browser is supported or not
if (typeof(Storage) !== "undefined") {
  var myTasks = localStorage.getItem("myTasks")
  if (myTasks) {

    var tasksArray = JSON.parse(myTasks);
    
    // Deletes the old task id
    var newTaskArray = tasksArray.map(function(obj) {
      delete obj.id;
      return obj;
    });

    newTaskArray.forEach(function(obj) {
      newTask.addTask(obj.name, obj.description, obj.assignedTo, obj.dueDate, obj.status);
      newTask.displayTask();
    });
  } else {
    console.log("Browser does not support localStorage");
  }
}

const alertElements = {
  inputAlert: document.getElementById('name-alert'),
  descriptionAlert: document.getElementById('description-alert'),
  assignedToAlert: document.getElementById('assign-alert'),
  dueDateAlert: document.getElementById('date-alert'),
  statusAlert: document.getElementById('status-alert'),
};

let showAlerts = (alertType) => {
    // TODO: Refactor alert code so it's not spaghetti 
  function inputAlertDisplay() {
    if(alertType === "No name" || alertType === "Task too small") {
      switch(alertType) {
        case "No name":
          alertElements.inputAlert.style.display = 'block';
          alertElements.inputAlert.innerHTML = 'Please enter a task name';
        break;
        case "Task too small":
          alertElements.inputAlert.style.display = 'block';
          alertElements.inputAlert.innerHTML = 'Task name needs to be longer than 8 characters';
        break;   
        default:
      } 
    }
  }

  function descriptionAlertDisplay() {
    if(alertType === "No description" || alertType === "Description too small") {
      switch(true) {
        case alertType === "No description":
          alertElements.descriptionAlert.style.display = 'block';
          alertElements.descriptionAlert.innerHTML = 'Please enter a description';
        break;
        case alertType === "Description too small":
          alertElements.descriptionAlert.style.display = 'block';
          alertElements.descriptionAlert.innerHTML = 'Description needs to be longer than 15 characters';
        break;
        default:
      }
    }
  }

  function assignedToAlertDisplay() {
    if(alertType === "Unassigned" || alertType === "Assign input too small") {
      switch(true) {
        case alertType === "Unassigned":
          alertElements.assignedToAlert.style.display = 'block';
          alertElements.assignedToAlert.innerHTML = 'Please assign a person to this task';
        break;
        case alertType === "Assign input too small":
          alertElements.assignedToAlert.style.display = 'block';
          alertElements.assignedToAlert.innerHTML = "Person's name need's to be at least 8 character's long";
        break;
        default:
      }
    }
  }

  function dateAlertDisplay() {
    if(alertType === "No date") {
      alertElements.dueDateAlert.style.display = 'block';
      alertElements.dueDateAlert.innerHTML = 'Please pick a due date for this task';
    }
  }

  function statusAlertDisplay() {
    if(alertType === "No status") {
      alertElements.statusAlert.style.display = 'block';
      alertElements.statusAlert.innerHTML = 'Please select a status';
    }
  }

  inputAlertDisplay();
  descriptionAlertDisplay();
  assignedToAlertDisplay();
  dateAlertDisplay();
  statusAlertDisplay();

  if(displayedAlert === false) {
    alert("There's an error with the information that was given");
    displayedAlert = true;
  }
}

function resetAlerts() {
  displayedAlert = false;
  let inputAlert = document.getElementById('name-alert');
  let descriptionAlert = document.getElementById('description-alert');
  let assignedToAlert = document.getElementById('assign-alert');
  let dateAlert = document.getElementById('date-alert');
  let statusAlert = document.getElementById('status-alert');

  tasksValidated = false;


  inputAlert.style.display = 'none';
  descriptionAlert.style.display = 'none';
  assignedToAlert.style.display = 'none';
  dateAlert.style.display = 'none';
  statusAlert.style.display = 'none';
}

let validateForm = () => {
  // Stops webpage from refreshing after clicking submit
document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();
});

    // Reserts alerts after user clicks submit
  resetAlerts();
  var task = document.getElementById('task-name').value;
  var description = document.getElementById('description').value;
  var assign = document.getElementById('assign').value;
  var date = document.getElementById('date-input').value;
  var status = document.getElementById('status').value;

    validateTaskName(task);
    validateDescription(description)
    validateAssign(assign)
    validateDate(date)
    validateStatus(status)

  if (displayedAlert === false) {
    newTask.addTask(task, description, assign, date, status);
    newTask.displayTask();

    var myTasks = JSON.stringify(newTask.tasks);
    localStorage.setItem("myTasks", myTasks);

    document.getElementById("myForm").reset();
  }
} 

let validateTaskName = (input) =>{
  let error;
  switch(true) {
    case input.length === 0:
      error = "No name";
      showAlerts(error);
    break;
    case input.length <= 5:
      error = "Task too small";
      showAlerts(error);
    break;
    default:
      return false;
  }
}

let validateDescription = (input) => {
  let error;
  switch(true) {
    case input.length === 0:
      error = "No description";
      showAlerts(error);
    break;
    case input.length <= 10:
      error = "Description too small";
      showAlerts(error);
    break;
    default:
      return false;
  }
}

let validateAssign = (input) => {
  let error;
  switch(true) {
    case input.length === 0:
      error = "Unassigned";
      showAlerts(error);
    break;
    case input.length <= 4:
      error = "Assign input too small";
      showAlerts(error);
    break;
    default:
      return false;
  }
}

let validateDate = (input) => {
  let error;
  switch(true) {
    case input.length === 0:
      error = "No date";
      showAlerts(error);
    break;
    default:
      return false;
  }
}

let validateStatus = (input) => {
  let error;
  switch(true) {
    case input === "Status":
      error = "No status";
      showAlerts(error);
    break;
    default:
      return false;
  } 
}