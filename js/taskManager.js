const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  // console.log(name);
  // console.log(description);
  // console.log(assignedTo);
  // console.log(dueDate);
  // console.log(status);
  console.log(status);
  let newHtml = "";
  newHtml = `
  
                <li class="mx-3 card border-dark mb-3" data-task-id="${id}">
              <div class="card-body text-dark ">
                <p class="card-text taskName"><span>Task Name:</span> ${name}</p>
                <p class="card-text description "><span>Task Description:</span> ${description}</p>
               
                <p class="card-text due"><span>Due Date:</span> ${dueDate}</p>
                <p class="card-text status"><span>Status:</span><span style ="color:${
                  taskColor[status.toLowerCase()]
                }"> ${status}<span></p>
                <div class = "userIcons">
                <img alt = ${assignedTo} src = ${userIcons[assignedTo]}>
                </div>
              </div>
              <div class="card-footer py-0 d-flex justify-content-end align-items-center">
                <i class="icons far fa-check-square mx-1 fa-lg text-success btnMark ${
                  status.toLowerCase() == "done" ? "d-none" : ""
                }"></i>
        
                <i data-bs-toggle="modal" data-bs-target="#myModalUpdate" class="icons fas fa-pen-square mx-1 fa-lg text-warning btnUpdate"></i>
                <i  class="icons fas fa-minus-square mx-1 fa-lg text-danger btn-delete"></i>
              </div>
            </li>`;

  return newHtml;
};

let taskColor = {
  todo: "#2fc8f786",
  inprogress: "#FAD02C",
  review: "#FAD02C",
  done: "#007500",
};

let userName = {
  william: "William Ortega",
  anne: "Anne Roberts",
  cath: "Catherine White",
  james: "James White",
  robert: "Robert Smith",
};

let userIcons = {
  william: "./images/users/william.jpg",
  anne: "./images/users/anne.jpg",
  cath: "./images/users/cath.jpg",
  james: "./images/users/james.jpg",
  robert: "./images/users/robert.jpg",
};
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  newTask(name, description, assignedTo, dueDate, status) {
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

  updateTask(id, name, description, assignedTo, dueDate, status) {
    const updatedTask = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      console.log(`task id ${task.id} and passed id ${id}`);
      if (task.id === id) {
        console.log(`task id ${task.name} and passed id ${name}`);
        (task.name = name),
          (task.description = description),
          (task.assignedTo = assignedTo),
          (task.dueDate = dueDate),
          (task.status = status);
      }
    }
  }

  getId(taskId) {
    console.log(taskId);
    let getTask;
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id === taskId) {
        console.log("test");
        getTask = task;
        // console.log(task.id);
      }
    }
    return getTask;
  }

  render() {
    let todo = [];
    let review = [];
    let inprogress = [];
    let done = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const date = new Date(task.dueDate);
      const formattedDate = date.toDateString();
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        // task.dueDate,
        task.status
      );
      switch (task.status.toLowerCase()) {
        case "todo":
          todo.push(taskHtml);
          break;
        case "review":
          review.push(taskHtml);
          break;
        case "inprogress":
          inprogress.push(taskHtml);
          break;
        case "done":
          done.push(taskHtml);
          break;
        default:
          console.error("Status not found");
      }
    }
    const todoHTML = todo.join("\n");
    const reviewHTML = review.join("\n");
    const inprogressHTML = inprogress.join("\n");
    const doneHTML = done.join("\n");
    document.querySelector("#todo").innerHTML = todoHTML;
    document.querySelector("#review").innerHTML = reviewHTML;
    document.querySelector("#inprog").innerHTML = inprogressHTML;
    document.querySelector("#done").innerHTML = doneHTML;
    // const todolist = document.querySelector("#todo");
    // todolist.innerHTML = todoHTML;
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

  deleteTask(taskId) {
    const updateTask = [];

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id !== taskId) {
        updateTask.push(task);
      }
    }
    this.tasks = updateTask;
  }
}
