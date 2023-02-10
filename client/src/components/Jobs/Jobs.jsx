import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Job from './Job'
import jobs from './jobData'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: '2rem',
		},
		heading: {
			padding: '1rem',
			marginBottom: '0',
		},
	})
)

const Jobs = (props) => {
	const classes = useStyles()
	return (
		<Grid container>
			<Typography variant='h3' component='h1' className={classes.heading}>
				Internships & Jobs
			</Typography>
			<Grid container spacing={3} className={classes.root}>
				{jobs.map((job) => {
					return (
						<Grid item xs={12} sm={6} md={3} key={job.id}>
							<Job job={job} />
						</Grid>
					)
				})}
			</Grid>
		</Grid>
	)
}

export default Jobs
