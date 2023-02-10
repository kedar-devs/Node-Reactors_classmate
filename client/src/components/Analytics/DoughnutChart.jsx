import React from 'react'
import { Doughnut } from 'react-chartjs-2'

function DoughnutChart({ status }) {
	const data = {
		labels: status.x,
		datasets: [
			{
				label: 'Assignment Status',
				data: status.y,

				backgroundColor: [
					'rgba(63, 81, 181,1)',
					'rgba(233, 30, 99,1)',
					'rgba(76, 175, 80,1)',
				],
			},
		],
	}

	const options = {
		title: {
			display: true,
			text: 'Assignment Status',
		},
	}
	return <Doughnut data={data} options={options} />
}

export default DoughnutChart
