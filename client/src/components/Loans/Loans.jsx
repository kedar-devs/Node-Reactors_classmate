import {
	Button,
	createStyles,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core'
import React from 'react'
import Loan from './Loan'
import loans from './loanData'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: '2rem',
		},
		heading: {
			padding: '1rem',
			marginBottom: '0',
		},
		btn: {
			marginLeft: '1rem',
		},
	})
)

const Loans = (props) => {
	const classes = useStyles()
	return (
		<Grid container>
			<Typography variant='h3' component='h1' className={classes.heading}>
				Education Loans
				<Link to='/expenses' style={{ textDecoration: 'none' }}>
					<Button variant='contained' color='primary' className={classes.btn}>
						Expenses
					</Button>
				</Link>
				<Link to='/addexpense' style={{ textDecoration: 'none' }}>
					<Button variant='contained' color='primary' className={classes.btn}>
						Add Expense
					</Button>
				</Link>
			</Typography>
			<Grid container spacing={3} className={classes.root}>
				{loans.map((loan) => {
					return (
						<Grid item xs={12} sm={6} md={3} key={loan.id}>
							<Loan loan={loan} />
						</Grid>
					)
				})}
			</Grid>
		</Grid>
	)
}

export default Loans
