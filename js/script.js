const taskManager = new TaskManager(0);

// load the storage data
taskManager.loadStorage();
// to render current data into html
taskManager.render();
form = document.querySelector("#taskForm");

form.addEventListener("submit", submitItem);

function submitItem(event) {
  let name = document.querySelector("#inputTaskName");
  let description = document.querySelector("#inputDescription");
  let assignee = document.querySelector("#inputAssignee");
  let due = document.querySelector("#inputDate");
  let status = document.querySelector("#inputStatus");
  let alert = document.querySelector("#alert");
  let myModal = new bootstrap.Modal(document.getElementById("myModal"));
  let fail = 0;

  event.stopPropagation();

  if (name.value.length > 5) {
    name.classList.add("is-valid");
    name.classList.remove("is-invalid");
  } else {
    name.classList.add("is-invalid");
    name.classList.remove("is-valid");
    fail++;
  }

  if (description.value.length > 5) {
    description.classList.add("is-valid");
    description.classList.remove("is-invalid");
  } else {
    description.classList.add("is-invalid");
    description.classList.remove("is-valid");
    fail++;
  }

  if (assignee.value.length > 5) {
    assignee.classList.add("is-valid");
    assignee.classList.remove("is-invalid");
  } else {
    assignee.classList.add("is-invalid");
    assignee.classList.remove("is-valid");
    fail++;
  }

  const clearAll = () => {
    name.classList.remove("is-valid");
    description.classList.remove("is-valid");
    assignee.classList.remove("is-valid");
    form.reset();
  };

  if (fail > 0) {
    return;
  } else {
    taskManager.newTask(
      name.value,
      description.value,
      assignee.value,
      due.value,
      status.value
    );
    myModal.hide();

    alert.classList.remove("collapse");
    setTimeout(function () {
      alert.classList.add("collapse");
    }, 2000);

    clearAll();
    //save locally

    event.preventDefault();
    taskManager.saveStorage();
    taskManager.render();
  }
}

/// Mark as Done

let todolist = document.querySelector("#todo");
let review = document.querySelector("#review");
let inprogress = document.querySelector("#inprog");
let done = document.querySelector("#done");

// click events!

todolist.addEventListener("click", updateStatus);
review.addEventListener("click", updateStatus);
inprogress.addEventListener("click", updateStatus);
done.addEventListener("click", updateStatus);

function updateStatus(e) {
  //mark as done
  if (e.target.classList.contains("btnMark")) {
    const parentTask = e.target.parentElement.parentElement;
    console.log(parentTask);
    const taskId = Number(parentTask.dataset.taskId);
    console.log(taskId);
    const task = taskManager.getId(taskId);
    // console.log(task.id);
    task.status = "Done";
    //save locally
    taskManager.saveStorage();
    // Render the tasks
    taskManager.render();
  }

  //delete
  if (e.target.classList.contains("btn-delete")) {
    if (confirm("Are you sure you want to delete this task?")) {
      const parentTask = e.target.parentElement.parentElement;
      const taskId = Number(parentTask.dataset.taskId);
      let alert = document.querySelector("#deleteAlert");
      taskManager.deleteTask(taskId);
      taskManager.saveStorage();
      // Render the tasks
      taskManager.render();

      alert.classList.remove("collapse");
      setTimeout(function () {
        alert.classList.add("collapse");
      }, 2000);
    }
  }

  //update

  if (e.target.classList.contains("btnUpdate")) {
    const parentTask = e.target.parentElement.parentElement;
    console.log(parentTask);
    const taskId = Number(parentTask.dataset.taskId);
    const task = taskManager.getId(taskId);
    let taskName = document.querySelector("#updateTaskName");
    let description = document.querySelector("#updateDescription");
    let assignee = document.querySelector("#updateAssignee");
    let due = document.querySelector("#updateDate");
    let status = document.querySelector("#updateStatus");
    let form = document.querySelector("#taskFormUpdate");
    console.log("awit");
    console.log(task.id);

    taskName.value = task.name;
    description.value = task.description;
    assignee.value = task.assignedTo;
    due.value = task.dueDate;
    status.value = task.status.toUpperCase();
    form.setAttribute("data-task-id", task.id);
  }
}

// UPDATE FORM
formUpdate = document.querySelector("#taskFormUpdate");

formUpdate.addEventListener("submit", submitUpdateItem);

function submitUpdateItem(event) {
  let name = document.querySelector("#updateTaskName");
  let description = document.querySelector("#updateDescription");
  let assignee = document.querySelector("#updateAssignee");
  let due = document.querySelector("#updateDate");
  let status = document.querySelector("#updateStatus");
  let alert = document.querySelector("#alertUpdate");
  // let myModal = new bootstrap.Modal(document.getElementById("myModal"));
  let fail = 0;

  event.preventDefault();
  event.stopPropagation();

  if (name.value.length > 5) {
    name.classList.add("is-valid");
    name.classList.remove("is-invalid");
  } else {
    name.classList.add("is-invalid");
    name.classList.remove("is-valid");
    fail++;
  }

  if (description.value.length > 5) {
    description.classList.add("is-valid");
    description.classList.remove("is-invalid");
  } else {
    description.classList.add("is-invalid");
    description.classList.remove("is-valid");
    fail++;
  }

  if (assignee.value.length > 5) {
    assignee.classList.add("is-valid");
    assignee.classList.remove("is-invalid");
  } else {
    assignee.classList.add("is-invalid");
    assignee.classList.remove("is-valid");
    fail++;
  }

  const clearAll = () => {
    name.classList.remove("is-valid");
    description.classList.remove("is-valid");
    assignee.classList.remove("is-valid");
    formUpdate.reset();
  };

  if (fail > 0) {
    return;
  } else {
    let id = Number(formUpdate.getAttribute("data-task-id"));
    console.log("awits" + id);
    taskManager.updateTask(
      id,
      name.value,
      description.value,
      assignee.value,
      due.value,
      status.value
    );
    // taskManager.newTask(
    //   name.value,
    //   description.value,
    //   assignee.value,
    //   due.value,
    //   status.value
    // );

    alert.classList.remove("collapse");
    setTimeout(function () {
      alert.classList.add("collapse");
    }, 2000);

    clearAll();
    //save locally
    taskManager.saveStorage();
    taskManager.render();
  }
}
