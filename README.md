# TodoApp

First create a textarea to enter the list of task to do, while typing Create todo button have to display on the right.

Then display the list of items created with checkbox.

While selecting the checkbox, display line-through text and push the list item to bottom. like that, while unselecting the checkbox pull the item to the top.

## form to add todoTask

while entering text in the input field, add button will be visible and after adding the task, it will be diabled.

```
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

```

## checkbox function

while checkBox is checked, line-through the text and while unchecking it display the text. save the task in the local storage.
