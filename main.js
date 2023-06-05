class TaskCard {
  // TODO: Fix up class
  constructor(name, description, assignedTo, dueDate, status) {
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
  }
}

var taskManager = [];
var displayedAlert = false;

let showAlerts = (alertType) => {
  
    // TODO: Refactor alert code so it's not spaghetti 
  let inputAlert = document.getElementById('name-alert');
  let descriptionAlert = document.getElementById('description-alert');
  let assignedToAlert = document.getElementById('assign-alert');
  let dueDateAlert = document.getElementById('date-alert');
  let statusAlert = document.getElementById('status-alert');

  function inputAlertDisplay() {
    if(alertType === "No name" || alertType === "Task too small") {
      switch(alertType) {
        case "No name":
          inputAlert.style.display = 'block';
          inputAlert.innerHTML = 'Please enter a task name';
        break;
        case "Input too small":
          inputAlert.style.display = 'block';
          inputAlert.innerHTML = 'Task name needs to be longer than 8 characters';
        break;   
        default:
          console.log("task broke");
      } 
    }
  }

  function descriptionAlertDisplay() {
    if(alertType === "No description" || alertType === "Description too small") {
      switch(true) {
        case alertType === "No description":
          descriptionAlert.style.display = 'block';
          descriptionAlert.innerHTML = 'Please enter a description';
        break;
        case alertType === "Description too small":
          descriptionAlert.style.display = 'block';
          descriptionAlert.innerHTML = 'Description needs to be longer than 15 characters';
        break;
        default:
          console.log("description broke");
      }
    }
  }

  function assignedToAlertDisplay() {
    if(alertType === "Unassigned" || alertType === "Assign input too small") {
      switch(true) {
        case alertType === "Unassigned":
          assignedToAlert.style.display = 'block';
          assignedToAlert.innerHTML = 'Please assign a person to this task';
        break;
        case alertType === "Assign input too small":
          assignedToAlert.style.display = 'block';
          assignedToAlert.innerHTML = "Person's name need's to be at least 8 character's long";
        break;
        default:
          console.log("assign broke");
      }
    }
  }

  function dateAlertDisplay() {
    if(alertType === "No date") {
        dueDateAlert.style.display = 'block';
        dueDateAlert.innerHTML = 'Please pick a due date for this task';
    }
  }

  function statusAlertDisplay() {
    if(alertType === "No status") {
      statusAlert.style.display = 'block';
      statusAlert.innerHTML = 'Please select a status';
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
  // If there are no issues with validation, these will return false
  let newTask = new TaskCard;

  if(validateTaskName(task) === false)
    newTask.name = task;

  if(validateDescription(description) === false)
    newTask.description = description; 

  if(validateAssign(assign) === false)
    newTask.assignedTo = assign;

  if(validateDate(date) === false)
    newTask.dueDate = date; 

  if(validateStatus(status) === false);
    newTask.status = status;

  if (displayedAlert === false) {
    taskManager.push(JSON.stringify(newTask));
    // Display the task information
    displayTasks(taskManager);
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

// Display the tasks on the web page
let displayTasks = (tasks) => {
  let taskContainer = document.querySelector(".task-bottom-row");
  taskContainer.innerHTML = "";

  let modal = document.querySelector(".modal");
  let modalTitle = modal.querySelector(".modal-title");
  let modalBody = modal.querySelector(".modal-body");
  let modalFooter = modal.querySelector(".modal-footer");

  var deleteButton = modalFooter.querySelector("#delete-button")
  var id = 0;

  for(var i = 0; i < tasks.length; i++) {

    let task = JSON.parse(tasks[i]);
    let card = document.createElement("div");

    id = i;
    console.log(task);
    console.log(tasks.length);

    modalBody.id = i;
    card.className = "card";
    card.setAttribute('data-bs-toggle', 'modal');
    card.setAttribute('data-bs-target', '#taskOneModal');
    card.id = i;
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${task.name}</h5>
      </div>
    `;

    card.addEventListener('click', function() {

      console.log("Card id is " + card.id);

      modalTitle.textContent = `${task.name}`;
      modalBody.innerHTML = `
      <label>Task description:</label>
      <p>${task.description}</p>
      <label>Assigned to:</label>
      <p>${task.assignedTo}</p>
      <label>Due date:</label>
      <p>${task.dueDate}</p>
      <label>Task status:</label>
      <p>${task.status}</p>
      `;
    });

    // deleteButton.addEventListener('click', function() {
    //   console.log("Deleting " + card.id);
    //   tasks.splice(0, modal.id);
    //   console.log(tasks);
    //   displayTasks();
    // });

    taskContainer.appendChild(card);
  }
}

function deleteTask() {

  let modal = document.querySelector(".modal");
  let modalBody = modal.querySelector(".modal-body");

 // console.log("this is " + modalBody.id);
  console.log(taskManager[modalBody.id]);
}

// document.addEventListener("DOMContentLoaded", function(event) { 
//   displayTasks();
// });