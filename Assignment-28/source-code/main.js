import Chart from 'chart.js/auto';

// MARKS (Bar Chart)
new Chart(document.getElementById("marksChart"), {
  type: "bar",
  data: {
    labels: ["Math", "Science", "English"],
    datasets: [{
      label: "Marks",
      data: [85, 78, 92],
      backgroundColor: ["#3b82f6", "#22c55e", "#f97316"]
    }]
  },
  options: {
    responsive: true
  }
});

// ATTENDANCE (Doughnut)
new Chart(document.getElementById("attendanceChart"), {
  type: "doughnut",
  data: {
    labels: ["Present", "Absent", "Leave"],
    datasets: [{
      data: [75, 15, 10],
      backgroundColor: ["#22c55e", "#ef4444", "#facc15"]
    }]
  },
  options: {
    responsive: true,
    cutout: "60%"
  }
});

// PROGRESS (Line Chart)
new Chart(document.getElementById("progressChart"), {
  type: "line",
  data: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{
      label: "Progress (%)",
      data: [60, 70, 75, 85],
      borderColor: "#2563eb",
      backgroundColor: "#93c5fd",
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true
  }
});
