// Get elements
let input = document.getElementById("taskInput");
let list = document.getElementById("taskList");

// Add task
function addTask() {

  // if input is empty → stop
  if (input.value === "") return;

  // create list item with text + delete button
  let li = document.createElement("li");
  li.innerHTML = input.value + " <button onclick='this.parentElement.remove()'>❌</button>";

  // add to list
  list.appendChild(li);

  // clear input
  input.value = "";
}
