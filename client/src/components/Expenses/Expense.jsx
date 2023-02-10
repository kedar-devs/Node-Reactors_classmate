import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: '0.5rem',
			background: '#e0e0e0',
			width: '500px',
			[theme.breakpoints.down('sm')]: {
				width: '300px',
			},
		},
		amount: {
			color: 'red',
			fontWeight: 800,
		},
		expense: {
			fontWeight: 800,
		},
	})
)

function Expense({ expense }) {
	const classes = useStyles()
	return (
		<Grid
			container
			direction='row'
			justify='space-around'
			alignItems='center'
			className={classes.root}
		>
			<Typography className={classes.expense}>{expense.expense}</Typography>
			<Typography className={classes.amount}>{`₹${expense.amount}`}</Typography>
		</Grid>
	)
}

export default Expense
