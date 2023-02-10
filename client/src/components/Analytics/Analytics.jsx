import React from 'react'
import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import LineChart from './LineChart'
import DoughnutChart from './DoughnutChart'
import { grades, status } from './data'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			maxWidth: '1096px',
			// padding: '1rem',
			// overflow: 'hidden',
		},
		chart: {
			width: '500px',
			[theme.breakpoints.up('sm')]: {
				width: '820px',
			},
		},
		heading: {
			padding: '1rem',
		},
	})
)

function Analytics() {
	const classes = useStyles()
	return (
		<Grid container className={classes.root}>
			<Typography variant='h3' component='h1' className={classes.heading}>
				Analytics
			</Typography>
			<Grid
				container
				item
				className={classes.root}
				justify='center'
				alignItems='center'
				direction='column'
				spacing={8}
			>
				{/* Line Chart */}
				<Grid item sm={12} className={classes.chart}>
					<LineChart grades={grades} />
				</Grid>
				{/* Bar Chart */}
				<Grid item sm={12} className={classes.chart}>
					<DoughnutChart status={status} />
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Analytics
