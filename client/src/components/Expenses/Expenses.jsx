import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Expense from './Expense'
import expenses from './expensesData'

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

function Expenses() {
	const classes = useStyles()
	return (
		<Grid container>
			<Typography variant='h3' component='h1' className={classes.heading}>
				Expenses
			</Typography>
			<Grid
				container
				direction='column'
				justify='center'
				alignItems='flex-start'
				spacing={2}
				className={classes.root}
			>
				{expenses.map((expense) => (
					<Grid item key={expense.id} xs={12}>
						<Expense expense={expense} />
					</Grid>
				))}
			</Grid>
		</Grid>
	)
}

export default Expenses
