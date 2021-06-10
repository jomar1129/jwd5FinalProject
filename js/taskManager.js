const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  //   console.log(name);
  //   console.log(description);
  //   console.log(assignedTo);
  //   console.log(dueDate);
  //   console.log(status);

  let text = "";
  let newHtml = "";
  if (status === "Done") {
    text = "text-success";
    newHtml = `<li class="mx-3 card border-dark mb-3" data-task-id="${id}">
              <div class="mx-3 header mt-3 d-flex justify-content-between">
                <h3>TASK#${id + 1}</h3>
                <button class="btn btn-danger">Delete</button>
              </div>
              <div class="card-body text-dark ">
                <p class="card-text taskName"><span>Task Name:</span> ${name}</p>
                <p class="card-text description "><span>Task Description:</span> ${description}</p>
                <p class="card-text assignee"><span>Assigned To:</span> ${assignedTo}</p>
                <p class="card-text due"><span>Due Date:</span> ${dueDate}</p>
                <p class="card-text status"><span>Status:</span><span class =${text}> ${status}<span></p>
              </div>
              <div class="footer d-sm-flex mx-3 justify-content-between mb-3">
                <button class="btn btn-success collapse btnMark">Mark As Done</button>
                <button class="btn btn-warning btnUpdate">Update Task</button>
              </div>
            </li>`;
  } else {
    text = "text-warning";
    newHtml = `<li class="mx-3 card border-dark mb-3" data-task-id="${id}">
              <div class="mx-3 header mt-3 d-flex justify-content-between">
                <h3>TASK#${id + 1}</h3>
                <button class="btn btn-danger">Delete</button>
              </div>
              <div class="card-body text-dark ">
                <p class="card-text taskName"><span>Task Name:</span> ${name}</p>
                <p class="card-text description "><span>Task Description:</span> ${description}</p>
                <p class="card-text assignee"><span>Assigned To:</span> ${assignedTo}</p>
                <p class="card-text due"><span>Due Date:</span> ${dueDate}</p>
                <p class="card-text status"><span>Status:</span><span class =${text}> ${status}<span></p>
              </div>
              <div class="footer d-sm-flex mx-3 justify-content-between mb-3">
                <button class="btn btn-success  btnMark">Mark As Done</button>
                <button class="btn btn-warning btnUpdate">Update Task</button>
              </div>
            </li>`;
  }

  return newHtml;
};

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  newTask(name, description, assignedTo, dueDate, status) {
    // console.log(name);
    // console.log(description);
    // console.log(assignedTo);
    // console.log(dueDate);
    // console.log(status);
    const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push(task);
  }

  getId(taskId) {
    console.log(taskId);
    let getTask;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === taskId) {
        getTask = task;
        console.log(task.id);
      }
    }
    return getTask;
  }

  render() {
    let HtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        task.dueDate,
        task.status
      );
      HtmlList.push(taskHtml);
    }
    const tasksHtml = HtmlList.join("\n");
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }

  saveStorage() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    const currentId = String(this.currentId);
    localStorage.setItem("currentId", currentId);
  }

  loadStorage() {
    let storageOutput = localStorage.getItem("tasks");
    let storrageId = localStorage.getItem("currentId");
    if (storageOutput) {
      const tasksJson = localStorage.getItem("tasks");
      this.tasks = JSON.parse(tasksJson);
    }
    if (storrageId) {
      const currentId = localStorage.getItem("currentId");
      this.currentId = Number(currentId);
    }
  }
}
