import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Chip } from '@material-ui/core'
import WorkIcon from '@material-ui/icons/Work'
import BusinessIcon from '@material-ui/icons/Business'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		background: '#e0e0e0',
		borderRadius: '10px',
		padding: '0.5rem',
	},

	title: {
		fontSize: 14,
	},
	chip: {
		padding: '0.2rem',
	},
	pos: {
		marginBottom: 5,
		marginTop: 3,
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		marginRight: 5,
	},
})

export default function OutlinedCard({ job }) {
	const classes = useStyles()

	return (
		<Card className={classes.root} variant='outlined'>
			<CardContent>
				<Typography
					className={classes.title}
					color='textSecondary'
					gutterBottom
				>
					<Chip
						color='secondary'
						icon={<WorkIcon />}
						size='small'
						label={job.post}
						className={classes.chip}
					/>
				</Typography>
				<Typography variant='h5' component='h2'>
					{job.job}
				</Typography>
				<Typography className={classes.pos} color='textSecondary'>
					<BusinessIcon className={classes.icon} /> {job.companyName}
				</Typography>
				<Typography className={classes.pos} color='textSecondary'>
					<LocationOnIcon className={classes.icon} /> {job.location}
				</Typography>
			</CardContent>
			<CardActions>
				<Link to={`/jobs/${job.id}`} style={{ textDecoration: 'none' }}>
					<Button size='small' variant='contained' color='primary'>
						View
					</Button>
				</Link>
			</CardActions>
		</Card>
	)
}
