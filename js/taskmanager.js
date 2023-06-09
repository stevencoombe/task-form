class TaskManager{
    constructor(taskId = 0) {
      this.tasks = [];
      this.taskId = taskId;
      this.currentTaskId = null;
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
      return task;
    }
  
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      var myTasks = JSON.stringify(this.tasks);
      localStorage.setItem("myTasks", myTasks);
    }
  
    displayTask() {
      let taskContainer = document.querySelector(".task-top-row");
      taskContainer.innerHTML = "";
    
      let modal = document.querySelector(".modal");
      let modalTitle = modal.querySelector(".modal-title");
      let modalBody = modal.querySelector(".modal-body");
      let modalFooter = modal.querySelector(".modal-footer");
      let deleteButton = modalFooter.querySelector("#delete-button");
    
      let currentTaskId = null;
    
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        
        let card = document.createElement("div");
        card.className = "card";
        card.style.backgroundColor = task.color;
        card.setAttribute("data-bs-toggle", "modal");
        card.setAttribute("data-bs-target", "#taskOneModal");
        card.id = i;
    
        let cardBody = document.createElement("div");
        cardBody.className = "card-body";
    
        let cardTitle = document.createElement("h5");
        cardTitle.className = "card-title task-title";
        cardTitle.textContent = task.name;
    
        let doneMessage = document.createElement("span");
        doneMessage.className = "done-message";
        doneMessage.textContent = "Done";
    
        cardBody.appendChild(cardTitle);
        if (task.status === "Done") {
          card.style.backgroundColor = "#d4af37";
          cardTitle.style.color = "white";
          doneMessage.classList.add("white-text");
          cardBody.appendChild(doneMessage);
        } else {
          let markDoneButton = document.createElement("button");
          markDoneButton.className = "mark-done";
          markDoneButton.textContent = "Mark as Done";
    
          markDoneButton.addEventListener("click", (e) => {
            task.status = "Done";
            card.style.backgroundColor = "#d4af37";
            cardTitle.style.color = "white";
            doneMessage.classList.add("white-text");
            cardBody.removeChild(markDoneButton);
            cardBody.appendChild(doneMessage);

            var myTasks = JSON.stringify(newTask.tasks);
            localStorage.setItem("myTasks", myTasks);
          });
    
          cardBody.appendChild(markDoneButton);
        }
    
        card.appendChild(cardBody);
    
        card.addEventListener("click", function () {
          modalTitle.textContent = task.name;
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
    
      deleteButton.addEventListener("click", () => {
        if (currentTaskId !== null) {
          newTask.deleteTask(currentTaskId);
          newTask.displayTask();
    
          var myModalEl = document.getElementById("taskOneModal");
          var modal = bootstrap.Modal.getInstance(myModalEl);
          modal.hide();
        }
      });
    }
  }
  