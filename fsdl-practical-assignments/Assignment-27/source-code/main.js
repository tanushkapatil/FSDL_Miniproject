import Chart from 'chart.js/auto';

// DATA
let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// LINE CHART (Temperature)
new Chart(document.getElementById("lineChart"), {
  type: "line",
  data: {
    labels: days,
    datasets: [{
      label: "Temperature (°C)",
      data: [30, 32, 29, 35, 33, 31, 34],
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

// BAR CHART (Rainfall)
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: days,
    datasets: [{
      label: "Rainfall (mm)",
      data: [5, 10, 3, 8, 6, 2, 4],
      backgroundColor: "#38bdf8"
    }]
  },
  options: {
    responsive: true
  }
});

// PIE CHART (Weather Types)
new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels: ["Sunny", "Rainy", "Cloudy"],
    datasets: [{
      data: [50, 30, 20],
      backgroundColor: ["#facc15", "#3b82f6", "#9ca3af"]
    }]
  },
  options: {
    responsive: true
  }
});
