import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
    const chartData = {
        labels: data.map(item => item.title),
        datasets: [{
            data: data.map(item => item.betrag),
            backgroundColor: ['#FF6384', // Light Red
                '#36A2EB', // Light Blue
                '#FFCE56', // Light Yellow
                '#4BC0C0', // Teal
                '#9966FF', // Purple
                '#FF9F40', // Orange
                '#FFDD57', // Light Orange-Yellow
                '#FF6F61', // Coral
                '#6B5B95'  // Slate Blue
            ],
        }],
    };

    return (
        <Pie
            data={chartData}
            options={{
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `${context.label}: €${context.raw}`;
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }}
        />
    );
};

export default PieChart;
