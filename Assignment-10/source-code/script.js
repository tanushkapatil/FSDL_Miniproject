let q = document.querySelectorAll(".faq-question");

q.forEach(function (el) {
  el.onclick = function () {
    el.parentElement.classList.toggle("open");
  };
});
