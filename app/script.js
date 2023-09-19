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
    console.log("sumbit");
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
}

function saveTodosInMemory() {
  console.log("saving in memory");
  localStorage.setItem("todosInMemory", JSON.stringify(todoList));
}

// Function to get data from localStorage
function getFromLocalSorage() {
  todoList = JSON.parse(localStorage.getItem("todosInMemory")) || [];
  updateUi();
}

function updateUi() {
  //   clearApp();
  for (let i = 0; i < todoList.length; i++) {
    const listItem = displayTask(todoList[i]);
    list.appendChild(listItem);
  }
}

function displayTask(listItem) {
  let listDiv = document.createElement("li");
  let text = document.createElement("lable");
  text.setAttribute("class", "form-check-lable");
  text.setAttribute("for", "form-check-input");
  text.innerText = listItem["task"];
  let check = document.createElement("input");
  check.setAttribute("class", "form-check-input");
  check.setAttribute("type", "checkbox");
  listDiv.append(check, text);

  //   adding fucntion for checkbox
  check.addEventListener("change", function () {
    insertBelow(listItem["id"]);
    if (check.checked) {
      text.style.textDecoration = "line-through";
    } else {
      text.style.textDecoration = "none";
    }
  });
  return listDiv;
}

function insertBelow(itemId) {}
