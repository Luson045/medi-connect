import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const StaticLineChart = () => {
  // Static data for number of people and wait time
  const chartData = {
    labels: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '1:00', '1:30', '2:00', '2:30'], // Larger time intervals
    datasets: [
      {
        label: 'People in Queue',
        data: [30, 25, 28, 35, 40, 38, 36, 30, 25, 20], // Number of people in queue
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Waiting Time (mins)',
        data: [45, 42, 50, 55, 60, 58, 57, 52, 48, 43], // Waiting time data
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <section className="chart-section">
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true, // Show legend
              position: 'top', // Position legend at the top
            },
            tooltip: {
              enabled: true, // Enable tooltips
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`; // Custom label format for tooltips
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
              max: 120, // Maximum value set to 120 (appropriate for waiting time)
            },
          },
        }}
      />
    </section>
  );
};

export default StaticLineChart;
