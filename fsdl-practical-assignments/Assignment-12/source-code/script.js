// Step 1: Get display
let display = document.getElementById("display");

// Step 2: Add values
function press(value) {
  display.value = display.value + value;
}

// Step 3: Clear display
function clearDisplay() {
  display.value = "";
}

// Step 4: Calculate result
function calculate() {
  display.value = eval(display.value);
}
