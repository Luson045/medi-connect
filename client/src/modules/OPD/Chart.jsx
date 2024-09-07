import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const StaticLineChart = () => {
  // Sample static data for queue length and wait time
  const [chartData, setChartData] = useState({
    labels: [], // Time labels
    datasets: [
      {
        label: 'People in Queue',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Waiting Time (mins)',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  });

  // Simulating real-time data fetching
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate fetching number of people in queue and wait time
      const newTime = new Date().toLocaleTimeString(); // Get current time
      const peopleInQueue = Math.floor(Math.random() * 50) + 1; // Simulate people in queue
      const waitTime = Math.floor(Math.random() * 120) + 1; // Simulate wait time in minutes

      // Update chart with new data
      setChartData((prevData) => ({
        labels: [...prevData.labels, newTime].slice(-10), // Keep only the last 10 time labels
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, peopleInQueue].slice(-10), // Keep only the last 10 people in queue data points
          },
          {
            ...prevData.datasets[1],
            data: [...prevData.datasets[1].data, waitTime].slice(-10), // Keep only the last 10 wait time data points
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <section className="chart-section">
      <h2>OPD Queue & Wait Time Monitoring</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
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
              max: 120, // Set max to 120 since wait time can be up to 120 mins
            },
          },
        }}
      />
    </section>
  );
};

export default StaticLineChart;
