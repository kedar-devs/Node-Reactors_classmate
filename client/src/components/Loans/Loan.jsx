import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Chip } from '@material-ui/core'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'

const useStyles = makeStyles({
	root: {
		maxWidth: 350,
		background: '#e0e0e0',
		borderRadius: '10px',
		padding: '0.5rem',
	},

	title: {
		fontSize: 14,
		marginBottom: 20,
	},
	chip: {
		padding: '0.2rem',
		marginLeft: '0.5rem',
		fontWeight: 800,
	},
	pos: {
		marginBottom: 5,
		marginTop: 3,
		display: 'flex',
		alignItems: 'center',
	},
	requirements: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 15,
	},
	icon: {
		marginRight: 5,
	},
	bold: {
		fontWeight: 800,
	},
	mb: {
		marginBottom: 15,
	},
})

export default function OutlinedCard({ loan }) {
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
						color='primary'
						size='small'
						label={`${loan.interest} %`}
						className={classes.chip}
						style={{ marginLeft: 0, marginRight: 5 }}
					/>
					{'  '}
					Effective Interest Rate
				</Typography>
				<Typography variant='h5' component='h2' className={classes.mb}>
					<AccountBalanceIcon /> {loan.name}
				</Typography>
				<Typography
					className={classes.pos}
					style={{ marginBottom: 15 }}
					color='textSecondary'
				>
					<span className={classes.bold}>Loans upto:</span>{' '}
					<Chip
						color='primary'
						size='small'
						label={`₹ ${loan.maxAmount} Lakh`}
						className={classes.chip}
					/>
				</Typography>
				<Typography className={classes.pos} color='textSecondary'>
					<span className={classes.bold}>Repayment period upto:</span>{' '}
					{`${loan.repaymentPeriod} years`}
				</Typography>
				<Typography className={classes.requirements} color='textSecondary'>
					<span className={classes.bold}>Key Requirements:</span>
					<span>{loan.requirements}</span>
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					size='small'
					variant='contained'
					color='primary'
					href={loan.link}
					target='_blank'
				>
					More Details
				</Button>
			</CardActions>
		</Card>
	)
}
