import React from 'react'
import { Line } from 'react-chartjs-2'

function LineChart({ grades }) {
	const data = {
		labels: grades.x,
		datasets: [
			{
				label: 'Grades (%)',
				data: grades.y,
				borderColor: ['rgba(63, 81, 181,0.4)'],
				backgroundColor: ['rgba(63, 81, 181,0.4)'],
				pointBackgroundColor: ['rgba(63, 81, 181,0.4)'],
				pointBorderColor: ['rgba(63, 81, 181,0.4)'],
			},
		],
	}

	const options = {
		title: {
			display: true,
			text: 'Grades in Subjects',
		},
		scales: {
			yAxes: [
				{
					ticks: {
						min: 0,
						max: 100,
						stepSize: 10,
					},
				},
			],
		},
	}
	return <Line data={data} options={options} />
}

export default LineChart
