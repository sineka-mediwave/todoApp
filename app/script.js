const list = document.querySelector("#taskList");
const form = document.querySelector("#todoForm");
const addBtn = document.querySelector("#addBtn");
const todoText = document.querySelector("#inputTask");

let todoList = [];

function enableBtn() {
  if (todoText == " ") {
    addBtn.style.visibility = "hidden";
  } else {
    addBtn.style.visibility = "visible";
  }
}

getFormElements();
getFromLocalSorage();

function getFormElements() {
  form.addEventListener("submit", function (r) {
    r.preventDefault();
    addTodoList();
  });
}

function addTodoList() {
  const todoTask = {
    id: new Date().getTime(),
    task: todoText.value,
    complete: false,
  };
  addTodo(todoTask);
}

function addTodo(task) {
  todoList.push(task);
  saveTodosInMemory();
  form.reset();
}

function saveTodosInMemory() {
  console.log("saving in memory");
  localStorage.setItem("todosInMemory", JSON.stringify(todoList));
  updateUi();
}

// Function to get data from localStorage
function getFromLocalSorage() {
  todoList = JSON.parse(localStorage.getItem("todosInMemory")) || [];
  updateUi();
}

function updateUi() {
  clearUi();
  sortArray();
  for (let i = 0; i < todoList.length; i++) {
    const listItem = displayTask(todoList[i]);
    list.appendChild(listItem);
  }
}

function clearUi() {
  list.innerHTML = "";
}

function displayTask(listItem) {
  let listDiv = document.createElement("li");
  const id = `task-${listItem["id"]}`;
  listDiv.setAttribute("id", id);

  if (listItem.complete) {
    let cmptext = document.createElement("lable");
    cmptext.setAttribute("class", "form-check-lable");
    cmptext.setAttribute("for", "form-check-input");
    cmptext.innerText = listItem["task"];
    let uncheck = document.createElement("input");
    uncheck.setAttribute("class", "form-check-input");
    uncheck.setAttribute("type", "checkbox");
    uncheck.checked = true;
    cmptext.style.textDecoration = "line-through";
    listDiv.append(uncheck, cmptext);

    uncheck.addEventListener("change", function () {
      uncomplete(listItem["id"]);
    });

    console.log("change");
  } else {
    let text = document.createElement("lable");
    text.setAttribute("class", "form-check-lable");
    text.setAttribute("for", "form-check-input");
    text.innerText = listItem["task"];
    text.style.textDecoration = "none";

    let check = document.createElement("input");
    check.setAttribute("class", "form-check-input");
    check.setAttribute("type", "checkbox");
    // check.checked = flase;

    listDiv.append(check, text);

    //   adding fucntion for checkbox
    check.addEventListener("change", function () {
      completed(listItem["id"]);
    });
  }

  return listDiv;
}

function completed(itemId) {
  const completedTask = todoList.findIndex((task) => task.id == itemId);
  if (completedTask != -1) {
    todoList[completedTask]["complete"] = true;
  }
  saveTodosInMemory();
}

function uncomplete(itemId) {
  const completedTask = todoList.findIndex((task) => task.id == itemId);
  if (completedTask != -1) {
    todoList[completedTask]["complete"] = false;
  }
  saveTodosInMemory();
}

function sortArray() {
  todoList.sort((a, b) =>
    a.complete === b.complete ? 0 : a.complete ? 1 : -1
  );
}
