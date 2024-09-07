import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const DynamicLineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Dynamic Data',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      const newValue = Math.floor(Math.random() * 100) + 1;

      setChartData((prevData) => ({
        labels: [...prevData.labels, newTime].slice(-10), // Keep only the last 10 labels
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newValue].slice(-10), // Keep only the last 10 data points
          },
        ],
      }));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <section className="chart-section">
      <h2>Dynamic Data Chart</h2>
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
              max: 100,
            },
          },
        }}
      />
    </section>
  );
};

export default DynamicLineChart;
