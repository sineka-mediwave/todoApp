const list = document.querySelector("#taskList");
const form = document.querySelector("#todoForm");
const todoText = document.querySelector("#inputTask");

function enableBtn() {
  const addBtn = document.querySelector("#addBtn");
  if (todoText == " ") {
    addBtn.style.visibility = "hidden";
    console.log("hide");
  } else {
    addBtn.style.visibility = "visible";
    console.log("visible");
  }
}
