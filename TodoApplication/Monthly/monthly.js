const inputbox = document.getElementById("newTaskInput");
const listcontainer = document.getElementById("taskList");

function addTask() {
  if (inputbox.value == "") {
    alert("You must write Something !!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputbox.value;
    listcontainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputbox.value = "";
  savedata();
}

listcontainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName == "LI") {
      e.target.classList.toggle("checked");
      savedata();
    } else if (e.target.tagName == "SPAN") {
      e.target.parentElement.remove();
      savedata();
    }
  },
  false
);

function savedata() {
  localStorage.setItem("data3", listcontainer.innerHTML);
}

function showTask() {
  listcontainer.innerHTML = localStorage.getItem("data3");
}

function toggleTasks() {
  const pendingTasksBtn = document.getElementById("pendingTasksBtn");

  // Check if the button text is "Show Pending Tasks"
  if (pendingTasksBtn.innerText === "Show Pending Tasks") {
    if (!checkPendingTasks()) {
      alert("There are no pending tasks.");
      return;
    }
    showPendingTasks();
    pendingTasksBtn.innerText = "Show All Tasks";
  } else {
    showAllTasks();
    pendingTasksBtn.innerText = "Show Pending Tasks";
  }
}

function checkPendingTasks() {
  // Retrieve tasks from localStorage
  let tasks = localStorage.getItem("data3");
  if (!tasks) return false;

  // Convert tasks from string to HTML elements
  listcontainer.innerHTML = tasks;

  // Check if there are pending tasks
  let pendingTasksExist = false;
  let taskItems = listcontainer.querySelectorAll("li");
  taskItems.forEach(function (task) {
    if (!task.classList.contains("checked")) {
      pendingTasksExist = true;
    }
  });

  return pendingTasksExist;
}

function showAllTasks() {
  // Clear the task list
  listcontainer.innerHTML = "";

  // Retrieve tasks from localStorage
  let tasks = localStorage.getItem("data3");
  if (!tasks) return;

  // Convert tasks from string to HTML elements
  listcontainer.innerHTML = tasks;

  // Display all tasks
  let taskItems = listcontainer.querySelectorAll("li");
  taskItems.forEach(function (task) {
    task.style.display = "block";
  });
}

function showPendingTasks() {
  // Clear the task list
  listcontainer.innerHTML = "";

  // Retrieve tasks from localStorage
  let tasks = localStorage.getItem("data3");
  if (!tasks) return;

  // Convert tasks from string to HTML elements
  listcontainer.innerHTML = tasks;

  // Filter out completed tasks and display pending tasks
  let taskItems = listcontainer.querySelectorAll("li");
  taskItems.forEach(function (task) {
    if (!task.classList.contains("checked")) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

showTask();
