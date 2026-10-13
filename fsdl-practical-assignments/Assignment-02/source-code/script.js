function makeSkill(skillName, percentage) {
  const box = document.createElement("div");
  box.className = "skill";

  const name = document.createElement("div");
  name.className = "skill-name";
  name.textContent = skillName;

  const bar = document.createElement("div");
  bar.className = "skill-bar";

  const fill = document.createElement("div");
  fill.className = "skill-fill";
  fill.style.width = percentage + "%";
  bar.appendChild(fill);

  const percent = document.createElement("div");
  percent.className = "skill-percent";
  percent.textContent = percentage + "%";

  box.appendChild(name);
  box.appendChild(bar);
  box.appendChild(percent);

  return box;
}

const container = document.getElementById("skillsContainer");
const form = document.getElementById("skillForm");
const nameInput = document.getElementById("skillName");
const percentInput = document.getElementById("skillPercent");

container.appendChild(makeSkill("HTML", 90));
container.appendChild(makeSkill("CSS", 85));
container.appendChild(makeSkill("JavaScript", 80));
container.appendChild(makeSkill("React", 70));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const skillName = nameInput.value.trim();
  const percentage = Number(percentInput.value);

  if (skillName === "" || percentage < 0 || percentage > 100 || Number.isNaN(percentage)) {
    return;
  }

  container.appendChild(makeSkill(skillName, percentage));
  form.reset();
  nameInput.focus();
});
