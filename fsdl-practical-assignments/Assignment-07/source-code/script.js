const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
const dropdown = document.querySelector(".dropdown");
const dropbtn = document.getElementById("dropbtn");

hamburger.onclick = () => menu.classList.toggle("active");

dropbtn.onclick = () => {
  if (window.innerWidth <= 768) dropdown.classList.toggle("open");
};
