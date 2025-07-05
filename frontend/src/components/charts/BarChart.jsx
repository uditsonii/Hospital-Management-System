import { plugins } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import plugin from "tailwindcss";

const BarChart = () => {
    const data = {
        labels: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'OPD Visits',
                data: [60, 50, 81, 65, 90, 85, 56],
                backgroundColor: 'blue-500'
            },
        ],
    };

    const options = {
        reponsive: true,
        plugins: {
            title: {
                display: true,
                text: "Weekly Patient Visits",
            },
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return <Bar data={data} options={options} />;
};


export default BarChart;