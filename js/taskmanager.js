class TaskManager{
    constructor(taskId = 0) {
      this.tasks = [];
      this.taskId = taskId;
    }
  
    addTask(name, description, assignedTo, dueDate, status) {
      const task = {
        id: this.taskId++,
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status
      };
  
      this.tasks.push(task);
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  
    displayTask() {
      console.log(this.tasks);
      let taskContainer = document.querySelector(".task-top-row");
      taskContainer.innerHTML = "";
     
      let modal = document.querySelector(".modal");
      let modalTitle = modal.querySelector(".modal-title");
      let modalBody = modal.querySelector(".modal-body");
      let modalFooter = modal.querySelector(".modal-footer");
      let deleteButton = modalFooter.querySelector("#delete-button")
      
      let currentTaskId = null;
  
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
  
        console.log(task);
  
        let card = document.createElement("div");
        card.className = "card";
        card.setAttribute('data-bs-toggle', 'modal');
        card.setAttribute('data-bs-target', '#taskOneModal');
        card.id = i;
        card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${task.name}</h5>
        </div>
      `;
  
      card.addEventListener('click', () => {      
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
        currentTaskId = task.id;
      });
        taskContainer.appendChild(card);
      }
      
      deleteButton.addEventListener('click', () => {
        if (currentTaskId !== null) {
          newTask.deleteTask(currentTaskId);
          newTask.displayTask();
          
          var myModalEl = document.getElementById('taskOneModal');
          var modal = bootstrap.Modal.getInstance(myModalEl);
          modal.hide();
        }
      });
    }
  }