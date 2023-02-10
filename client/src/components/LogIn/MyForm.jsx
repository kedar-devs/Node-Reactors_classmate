import {
	Button,
	LinearProgress,
	Typography,
	makeStyles,
	createStyles,
	Grid,
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			minHeight: '100vh',
		},
		title: {
			textAlign: 'center',
			marginBottom: '2rem',
			color: theme.palette.primary.main,
			fontWeight: '500',
		},
		form: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: '10px',
			background: '#e0e0e0',
			padding: '2rem',
			[theme.breakpoints.up('sm')]: {
				maxWidth: '500px',
			},
		},
		fields: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		fieldInput: {
			background: '#f4f4f4',
			borderRadius: '10px',
			[theme.breakpoints.up('sm')]: {
				width: '330px',
			},
		},

		signup: {
			marginBottom: '1rem',
			textAlign: 'center',
			[theme.breakpoints.down('sm')]: {
				marginBottom: '0',
				'& p': {
					fontSize: '12px',
				},
			},
		},

		action: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			alignItems: 'center',

			maxWidth: '300px',
			marginBottom: '0px',
		},

		loginButton: {
			marginTop: '2rem',
			fontWeight: 'bold',
			fontSize: '1rem',
		},
	})
)

const LoginForm = ({ signUp, company ,history}) => {
	const classes = useStyles()
	const initialValues = { email: '', password: '' }

	const submit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			if (!company) {
				axios.post("http://localhost:5000/student/login", values)
					.then(res => {
						console.log("successfully authenticated");
						console.log(res.data);
						localStorage.setItem("classmate",JSON.stringify( {
							token: res.data.token,
							userId:res.data.user._id
						}))
						history.push("/home")
					}).catch(err => {
						console.log("Error here in validating user");
						console.log(err);
				})
			} else {
				values.company = true
				axios.post("http://localhost:5000/recruitor/login", values)
					.then(res => {
						console.log("Company authenticated");
					}).catch(err => {
						console.log("There is an error here in authenticating the company");
						console.log(err);
					})
			}
		}, 500)
	}

	const validate = (values) => {
		const errors = {}
		if (!values.email) {
			errors.email = 'Required'
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		) {
			errors.email = 'Invalid email address'
		}
		if (!values.password) {
			errors.password = 'Required'
		} else if (values.password.length < 8) {
			errors.password = 'Password must be atleast 8 characters long!'
		}
		return errors
	}
	return (
		<Grid
			container
			direction='column'
			justify='center'
			alignItems='center'
			className={classes.root}
		>
			<Formik
				initialValues={initialValues}
				validate={validate}
				onSubmit={submit}
			>
				{({ submitForm, isSubmitting }) => (
					<Form className={classes.form} autoComplete='off'>
						<Typography variant='h5' component='h2' className={classes.title}>
							Classmate
						</Typography>
						<div className={classes.fields}>
							<Field
								className={classes.field}
								component={TextField}
								name='email'
								type='email'
								label='Email Id'
								variant='outlined'
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							<br />
							<Field
								className={classes.field}
								component={TextField}
								type='password'
								label='Password'
								name='password'
								variant='outlined'
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							{isSubmitting && <LinearProgress />}
						</div>

						{/* Log In Action */}
						<div className={classes.action}>
							<Button
								className={classes.loginButton}
								variant='contained'
								disabled={isSubmitting}
								onClick={submitForm}
								color='primary'
							>
								{signUp ? 'Sign Up' : 'Log In'}
							</Button>
						</div>
						<br />
						<br />
						{!signUp && (
							<div className={classes.signup}>
								<Typography>
									Don't have an account?{' '}
									<Link
										to={`/${company ? 'company' : 'student'}/signup`}
										className={classes.signupLink}
									>
										Create account
									</Link>
								</Typography>
							</div>
						)}
					</Form>
				)}
			</Formik>
		</Grid>
	)
}

export default LoginForm
