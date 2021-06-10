const taskManager = new TaskManager(0);
form = document.querySelector("#taskForm");

form.addEventListener("submit", submitItem);

function submitItem(event) {
  let name = document.querySelector("#inputTaskName");
  let description = document.querySelector("#inputDescription");
  let assignee = document.querySelector("#inputAssignee");
  let due = document.querySelector("#inputDate");
  let status = document.querySelector("#inputStatus");
  let modal = document.querySelector("#myModal");
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

    clearAll();
    taskManager.render();
  }
}
