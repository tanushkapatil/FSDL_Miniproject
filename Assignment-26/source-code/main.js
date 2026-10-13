import Chart from 'chart.js/auto';

let labels = ['Present', 'Absent', 'Leave'];
let data = [70, 20, 10];

let colors = ['#22c55e', '#ef4444', '#facc15'];

// PIE CHART
new Chart(document.getElementById('pieChart'), {
  type: 'pie',
  data: {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: colors,
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#374151',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    animation: {
      duration: 700
    }
  }
});

// DOUGHNUT CHART
new Chart(document.getElementById('doughnutChart'), {
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
      data: data,
      backgroundColor: colors,
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    cutout: '60%', // makes donut hole
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#374151',
          font: {
            weight: 'bold'
          }
        }
      }
    },
    animation: {
      duration: 700
    }
  }
});
