let b = document.getElementById("toggleBtn");

b.onclick = function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    b.innerText = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    b.innerText = "🌙";
    localStorage.setItem("theme", "light");
  }
};
