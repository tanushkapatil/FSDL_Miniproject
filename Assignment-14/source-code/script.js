// Get elements
let input = document.getElementById("textInput");
let result = document.getElementById("result");

// Reverse text
function reverseText() {
  let text = input.value;
  let reversed = text.split("").reverse().join("");
  result.innerText = reversed;
}

// Uppercase
function toUpper() {
  result.innerText = input.value.toUpperCase();
}

// Lowercase
function toLower() {
  result.innerText = input.value.toLowerCase();
}

// Length
function getLength() {
  result.innerText = input.value.length;
}
