class TaskCard {
  constructor(name, description, assignedTo) {
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
  }
}

var displayedAlert = false;

let showAlerts = (alertType) => {
  
  let inputAlert = document.getElementById('name-alert');
  let descriptionAlert = document.getElementById('description-alert');
  let assignedToAlert = document.getElementById('assign-alert');

  function inputAlertDisplay() {
    if(alertType === "No name" || alertType === "Task too small"){
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
    if(alertType === "No description" || alertType === "Description too small"){
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
    if(alertType === "Unassigned" || alertType === "Assign input too small"){
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



  
  inputAlertDisplay();
  descriptionAlertDisplay();
  assignedToAlertDisplay();

  // Stops webpage from refreshing after user clicks submit
   document.getElementById("myForm").addEventListener("submit", function(e) {
    e.preventDefault();
  });

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
  
  inputAlert.style.display = 'none';
  descriptionAlert.style.display = 'none';
  assignedToAlert.style.display = 'none';
  console.log("Resetting Alerts");
}

let validateForm = () => {
  // Reserts alerts after user clicks submit
  resetAlerts();
  var task = document.getElementById('task-name').value;
  var description = document.getElementById('description').value;
  var assign = document.getElementById('assign').value;
  var date = document.getElementById('date-input').value;

  console.log(typeof(date));
  let newTask = new TaskCard;

  if(validateTaskName(task) === false)
    newTask.name = task;

  if(validateDescription(description) === false)
    newTask.description = description; 

  if(validateAssign(assign) === false)
    newTask.assignedTo = assign;

  validateDate(date);  

   console.log(JSON.stringify(newTask));
 }

let validateTaskName = (input) =>{
  let error;
  switch(true) {
    case input.length === 0:
      error = "No name";
    showAlerts(error);
    break;
    case input.length <= 8:
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
    case input.length <= 15:
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
    case input.length <= 8:
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