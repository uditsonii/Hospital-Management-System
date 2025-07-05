import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Revenue (in ₹)',
        data: [10000, 15000, 13000, 17000, 20000],
        borderColor: 'rgba(16, 185, 129, 0.8)', // tailwind green-500
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
