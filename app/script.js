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
    if (check.checked) {
      text.style.textDecoration = "line-through";
      let parentElement = document.querySelector("#taskDone");
      parentElement.appendChild(listDiv);
      todoList.complete = true;
    } else {
      text.style.textDecoration = "none";
      list.appendChild(listDiv);
      todoList.complete = false;
    }
  });

  //   if (listItem.complete) {
  //     console.log("complete");
  //   }
  return listDiv;
}

function check() {
  if (todoList.complete) {
    console.log("complete");
  } else {
    console.log("uncomplete");
  }
}

// function insertBelow(itemId) {
//   const completedTask = todoList.findIndex((task) => task.id == itemId);
//   if (completedTask != -1) {
//     todoList[completedTask]["complete"] = true;
//     console.log("completefn");
//     let parentElement = document.getElementById("#taskDone");
//     // Get the parent's first child
//     let theFirstChild = parentElement.firstChild;

//     // Create a new element
//     //let completedTask = document.createElement("div");

//     // Insert the new element before the first child
//     parentElement.insertBefore(completedTask, theFirstChild);
//     updateUi();
//   }
// }
