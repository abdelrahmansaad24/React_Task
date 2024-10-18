import React from 'react'; // Importing React to use JSX and component functionality.
import { Bar } from 'react-chartjs-2'; // Importing Bar chart component from react-chartjs-2 library.
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Importing required Chart.js components.

// Registering the necessary components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Defining the CovidStatsChart component, which takes data as a prop.
export const CovidStatsChart = ({ data }) => {
    // Preparing the data structure for the chart
    const chartData = {
        labels: [
            'Cases',
            'Deaths',
            'Recovered',
            'Cases Today',
            'Deaths Today',
            'Recovered Today'
        ],
        datasets: [
            {
                label: 'COVID-19 Statistics', // Label for the dataset
                data: [
                    data.cases, // Total cases
                    data.deaths, // Total deaths
                    data.recovered, // Total recovered
                    data.todayCases, // Cases reported today
                    data.todayDeaths, // Deaths reported today
                    data.todayRecovered // Recoveries reported today
                ],
                // Background colors for the bars
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Color for Cases
                    'rgba(255, 99, 132, 0.2)', // Color for Deaths
                    'rgba(54, 162, 235, 0.2)', // Color for Recovered
                    'rgba(255, 206, 86, 0.2)', // Color for Cases Today
                    'rgba(153, 102, 255, 0.2)', // Color for Deaths Today
                    'rgba(255, 159, 64, 0.2)' // Color for Recovered Today
                ],
                // Border colors for the bars
                borderColor: [
                    'rgba(75, 192, 192, 1)', // Border color for Cases
                    'rgba(255, 99, 132, 1)', // Border color for Deaths
                    'rgba(54, 162, 235, 1)', // Border color for Recovered
                    'rgba(255, 206, 86, 1)', // Border color for Cases Today
                    'rgba(153, 102, 255, 1)', // Border color for Deaths Today
                    'rgba(255, 159, 64, 1)' // Border color for Recovered Today
                ],
                borderWidth: 1 // Width of the bar borders
            }
        ]
    };

    return (
        <div>
            {/* Rendering the Bar chart with the prepared chartData */}
            <Bar data={chartData} />
        </div>
    );
};
