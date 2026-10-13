let list = document.getElementById("list");
let draggedItem = null;

// When dragging starts
list.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("item")) {
    draggedItem = e.target;
    draggedItem.classList.add("dragging");
  }
});

// While dragging over items
list.addEventListener("dragover", (e) => {
  e.preventDefault();

  let target = e.target.closest(".item");

  if (!target || target === draggedItem) return;

  // Get position of item
  let box = target.getBoundingClientRect();
  let offset = e.clientY - box.top;

  // If mouse is in lower half → place after
  if (offset > box.height / 2) {
    list.insertBefore(draggedItem, target.nextSibling);
  } else {
    list.insertBefore(draggedItem, target);
  }
});

// When dragging ends
list.addEventListener("dragend", () => {
  if (draggedItem) {
    draggedItem.classList.remove("dragging");
  }
  draggedItem = null;
});
