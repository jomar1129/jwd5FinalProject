const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  //   console.log(name);
  //   console.log(description);
  //   console.log(assignedTo);
  //   console.log(dueDate);
  //   console.log(status);
  const newHtml = `<li class="mx-3 card border-dark mb-3">
              <div class="mx-3 header mt-3 d-md-flex justify-content-between">
                <h3>Task#${id}</h3>
                <button class="btn btn-danger">Delete</button>
              </div>
              <div class="card-body text-dark">
                <p class="card-text">TaskName: ${name}</p>
                <p class="card-text">Description : ${description}</p>
                <p class="card-text">Assignee: ${assignedTo}</p>
                <p class="card-text">Due Date: ${dueDate}</p>
                <p class="card-text">Status: ${status}</p>
              </div>
              <div class="footer d-md-flex mx-3 justify-content-between mb-3">
                <button class="btn btn-success">Mark As Done</button>
                <button class="btn btn-warning">Update Task</button>
              </div>
            </li>`;

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

  render() {
    let HtmlList = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const taskHtml = createTaskHtml(
        task.id + 1,
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
}
