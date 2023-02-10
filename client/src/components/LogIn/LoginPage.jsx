import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, createStyles, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: '3rem',
			[theme.breakpoints.down('sm')]: {
				padding: '1.5rem',
			},
		},
		title: {
			marginBottom: '3rem',
			fontWeight: 300,
		},
		card: {
			// marginRight: '8rem',
			minHeight: '330px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			alignItems: 'flex-start',
			background: '#e0e0e0',
			borderRadius: '10px',
			padding: '1.5rem',
			[theme.breakpoints.down('sm')]: {
				marginRight: '0',
				marginBottom: '2rem',
			},
			[theme.breakpoints.down('md')]: {
				// marginRight: '2rem',
			},
		},
		type: {
			fontWeight: 500,
			marginBottom: '1rem',
		},

		text: {
			fontWeight: '400',
		},
		btn: {
			padding: '0.7rem 2rem',
			marginTop: '1rem',
			marginBottom: '1rem',
		},
		signup: {
			color: theme.palette.primary.main,
		},
	})
)

const LoginPage = ({ signUp }) => {
	const classes = useStyles()
	return (
		// Login Page
		<Grid
			container
			direction='column'
			justify='center'
			className={classes.root}
		>
			{/* title */}
			<Grid container item direction='row' justify='flex-start'>
				<Typography variant='h2' component='h1' className={classes.title}>
					{signUp ? 'Sign Up' : 'Login'}
				</Typography>
				<div></div>
			</Grid>
			{/* Login Choices (companies/students) */}
			<Grid container item direction='row' justify='space-around'>
				{/* For Companies */}
				<Grid item sm={5} md={4} className={classes.card}>
					<Typography variant='h4' component='h2' className={classes.type}>
						For Companies
					</Typography>
					<Typography variant='h6' component='h3' className={classes.text}>
						We are the market–leading technical interview platform to identify
						and hire students with the right skills.
					</Typography>
					<Link
						to={`/company/${signUp ? 'signup' : 'login'}`}
						style={{ textDecoration: 'none' }}
					>
						<Button variant='contained' color='primary' className={classes.btn}>
							{signUp ? 'Sign Up' : 'Login'}
						</Button>
					</Link>
					{!signUp && (
						<Typography variant='h6' component='h3' className={classes.text}>
							Don't have an account?{' '}
							<Link to='/company/signup' className={classes.signup}>
								Sign up
							</Link>
						</Typography>
					)}
				</Grid>
				{/* For Students */}
				<Grid item sm={5} md={4} className={classes.card}>
					<Typography variant='h4' component='h2' className={classes.type}>
						For Students
					</Typography>
					<Typography variant='h6' component='h3' className={classes.text}>
						Join over many students, organize your classwork, analyze your
						performance and get hired.
					</Typography>
					<Link
						to={`/student/${signUp ? 'signup' : 'login'}`}
						style={{ textDecoration: 'none' }}
					>
						<Button variant='contained' color='primary' className={classes.btn}>
							{signUp ? 'Sign Up' : 'Login'}
						</Button>
					</Link>
					{!signUp && (
						<Typography variant='h6' component='h3' className={classes.text}>
							Don't have an account?{' '}
							<Link to='/student/signup' className={classes.signup}>
								Sign up
							</Link>
						</Typography>
					)}
				</Grid>
			</Grid>
		</Grid>
	)
}

export default LoginPage
