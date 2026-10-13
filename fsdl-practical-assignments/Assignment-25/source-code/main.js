import Chart from 'chart.js/auto';

// get canvas
const ctx = document.getElementById('myChart');

// create chart
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['CSE', 'IT', 'Mech', 'Civil'],
    datasets: [{
      label: 'Students',
      data: [150, 120, 90, 60],
      backgroundColor: ['#f97316', '#fb923c', '#f59e0b', '#ea580c'],
      borderColor: ['#c2410c', '#c2410c', '#b45309', '#9a3412'],
      borderWidth: 1.2,
      borderRadius: 10,
      borderSkipped: false,
      maxBarThickness: 64
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          boxWidth: 14,
          color: '#374151',
          font: {
            family: 'Trebuchet MS, Segoe UI, sans-serif',
            weight: '700'
          }
        }
      },
      tooltip: {
        displayColors: false,
        backgroundColor: '#111827',
        titleFont: {
          family: 'Trebuchet MS, Segoe UI, sans-serif',
          weight: '700'
        },
        bodyFont: {
          family: 'Trebuchet MS, Segoe UI, sans-serif'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#374151',
          font: {
            family: 'Trebuchet MS, Segoe UI, sans-serif',
            weight: '700'
          }
        }
      },
      y: {
        beginAtZero: true,
        suggestedMax: 160,
        ticks: {
          stepSize: 20,
          color: '#4b5563',
          font: {
            family: 'Trebuchet MS, Segoe UI, sans-serif'
          }
        },
        grid: {
          color: 'rgba(17, 24, 39, 0.1)'
        }
      }
    },
    animation: {
      duration: 700,
      easing: 'easeOutQuart'
    }
  }
});
