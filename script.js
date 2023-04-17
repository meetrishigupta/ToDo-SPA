//Creating Blank Array
let tasks = [];
//Get Data from HTML
const taskArray = document.getElementById("list");
const addtaskInput = document.getElementById("add");
const taskCounter = document.getElementById("task-counter");
//testing
console.log("working");

function asktTaskToDOM(task) {
  const li = document.createElement("li");
  li.innerHTML = `
  <input type ="checkbox" id = "${task.id}" ${
    task.done ? "checked" : ""
  }class="custom-checkbox">
  <label for= "${task.id}"> ${task.text}</label>
  <img src= "bin.svg" class="delete" data-id= "${task.id}" />`;
  taskArray.append(li);
}


function renderList() {
  taskArray.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    asktTaskToDOM(tasks[i]);
  }
  taskCounter.innerHTML = tasks.length;
}
//toggling task true and false 
function toggleTask(taskId) {
  const task = tasks.filter(function (task) {
    return task.id === taskId;
  });
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    renderList();
    showNotification("Task toggle successfully");
    return;
  } else {
    showNotification("Could not toggle the task ");
  }
}

// Delete functionallity 
function DeleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id !== taskId;
  });
  tasks = newTasks;
  renderList();
  showNotification("Task Delete successfully");
}
//Adding task 
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added Successfully");
    return;
  }
  showNotification("Task can not be added");
}

function showNotification(text) {
  alert(text);
}
// Handle Data on Input feild 
function handleInputKeypress(e) {
  if (e.key === "Enter") {
    const text = e.target.value;
    console.log("text:", text);
    if (!text) {
      showNotification("Task text can not be empty");
      return;
    }

    const task = {
      text,
      id: Date.now().toString(),
      done: false,
    };
    e.target.value = "";
    addTask(task);
  }
}
//Deleting task  listner only
function handleClickListner(e) {
  const target = e.target;
  if (target.className === "delete") {
    const taskID = target.dataset.id;
    DeleteTask(taskID);
    return;
  } else if (target.className === "custom-checkbox") {
    // const taskID = target.id;
    // toggleTask(taskID);
    return;
  }
}
//Starting App
function InitializeApp() {
  addtaskInput.addEventListener("keyup", handleInputKeypress);
  document.addEventListener("click", handleClickListner);
}
InitializeApp();
