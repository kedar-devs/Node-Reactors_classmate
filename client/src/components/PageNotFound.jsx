import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			height: '100vh',
		},
	})
)

const PageNotFound = (props) => {
	const classes = useStyles()
	return (
		<Grid
			container
			direction='column'
			justify='center'
			alignItems='center'
			className={classes.root}
		>
			<Typography variant='h1' component='h1'>
				404 Page Not Found!
			</Typography>
			<Link to='/'>Go to Home</Link>
		</Grid>
	)
}

export default PageNotFound
