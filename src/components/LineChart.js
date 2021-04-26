import React from 'react';
import { Line } from 'react-chartjs-2';

export default function LineChart({ countryMonth }) {
    return(
        <div>
            <Line data= {{
                labels: countryMonth.map(month => { return month.Date.split('T')[0]}),
        datasets: [{
                label: 'Daily Cases',
            data: countryMonth.map(month => {return month.Cases}),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointBackgroundColor: '#000'
        }]
    }}
    height={400}
    width={300}
    options= {{
        maintainAspectRatio: false,
                scales: {
                yAxes: [{ 
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: Math.max(...countryMonth.map(month => {return month.Cases})) * 2,
                    }
                }
            ]
        }
    }}
/>
        </div>

    )
}