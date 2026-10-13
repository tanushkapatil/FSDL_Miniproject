const searchInput = document.getElementById("search");
const rows = document.querySelectorAll("#glossaryTable tbody tr");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

function updateResults() {
  const query = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  rows.forEach((row) => {
    const matches = row.innerText.toLowerCase().includes(query);
    row.style.display = matches ? "" : "none";

    if (matches) {
      visibleCount += 1;
    }
  });

  resultCount.textContent = visibleCount === rows.length
    ? `Showing all ${rows.length} tags`
    : `Showing ${visibleCount} of ${rows.length} tags`;

  emptyState.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", updateResults);
updateResults();
