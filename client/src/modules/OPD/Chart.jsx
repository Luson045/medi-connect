import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const StaticLineChart = () => {
  const chartData = {
    labels: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30'],
    datasets: [
      {
        label: 'People in Queue',
        data: [30, 25, 28, 35, 40, 38, 36, 30, 25, 20],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Waiting Time (mins)',
        data: [45, 42, 50, 55, 60, 58, 57, 52, 48, 43],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows us to control the height of the chart independently of the width
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        min: 0,
        max: 120,
      },
    },
  };

  return (
    <section className="chart-section">
      <div className="w-full" style={{ height: '300px', maxWidth: '100%', margin: '0 auto' }}>
        {/* Ensures responsiveness by setting height and using width of the parent container */}
        <Line data={chartData} options={options} />
      </div>
    </section>
  );
};

export default StaticLineChart;
