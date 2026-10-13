// Get elements
let input = document.getElementById("noteInput");
let list = document.getElementById("noteList");

// Load notes (or empty array)
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Show notes
function show() {
  list.innerHTML = "";

  for (let i = 0; i < notes.length; i++) {
    list.innerHTML +=
      "<li class='note-item'>" +
      "<span class='note-text'>" + notes[i] + "</span>" +
      "<button class='delete-btn' onclick='removeNote(" + i + ")' aria-label='Delete note'>✕</button>" +
      "</li>";
  }
}

// Add note
function addNote() {
  if (input.value === "") return;

  notes.push(input.value);

  localStorage.setItem("notes", JSON.stringify(notes));

  input.value = "";

  show();
}

// Delete note
function removeNote(i) {
  notes.splice(i, 1);

  localStorage.setItem("notes", JSON.stringify(notes));

  show();
}

// Start
show();
