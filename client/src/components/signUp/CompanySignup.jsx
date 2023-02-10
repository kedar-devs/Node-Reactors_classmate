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
import axios from "axios"
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			minHeight: '100vh',
			padding: '2rem',
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
				maxWidth: '400px',
			},
		},
		fields: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			[theme.breakpoints.up('sm')]: {
				width: '400px',
			},
		},
		fieldInput: {
			background: '#f4f4f4',
    },
    fieldInput1: {
      background: '#f4f4f4',
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
		name: {
			display: 'flex',
			justify: 'space-between',
			[theme.breakpoints.down('sm')]: {
				flexDirection: 'column',
			},
		},
		company: {
			display: 'flex',
			justify: 'space-between',
			[theme.breakpoints.down('sm')]: {
				flexDirection: 'column',
			},
		},
	})
)

const CompanySignup = ({ signUp, company }) => {
	const classes = useStyles()
	const initialValues = {
		firstname: '',
		lastname: '',
		CompanyName: '',
		CompanyLoc: '',
		email: '',
		password: '',
		confirmPassword: '',
		numberemp: '',
		description: '',
		type: '',
		tag: '',
	}

	const submit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			axios.post("http://localhost:5000/recruitor/add", values)
				.then(res => {
				console.log("Company successfully added");
				}).catch(err => {
					console.log("Error here in registering the user");
					console.log(err);
				})
		}, 500)
	}

	const validate = (values) => {
		const errors = {}
		if (!values.firstname) {
			errors.firstname = 'Required'
		}
		if (!values.lastname) {
			errors.lastname = 'Required'
		}
		if (!values.CompanyName) {
			errors.CompanyName = 'Required'
		}
		if (!values.CompanyLoc) {
			errors.CompanyLoc = 'Required'
		}
		if (!values.type) {
			errors.type = 'Required'
		}
		if (!values.tag) {
			errors.tag = 'Required'
		}
		if (!values.description) {
			errors.description = 'Required'
		}
		if (!values.numberemp) {
			errors.numberemp = 'Required'
		}
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
		if (!values.confirmPassword) {
			errors.confirmPassword = 'Required'
		} else if (values.password !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords must match!'
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
							<div className={classes.name}>
								<Field
									className={classes.field}
									component={TextField}
									name='firstname'
									type='text'
									label='First Name'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
								<br />
								<Field
									className={classes.field}
									component={TextField}
									name='lastname'
									type='text'
									label='Last Name'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
							</div>
							<br />
							<div className={classes.company}>
								<Field
									className={classes.field}
									component={TextField}
									name='CompanyName'
									type='text'
									label='Company Name'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
								<br />
								<Field
									className={classes.field}
									component={TextField}
									name='CompanyLoc'
									type='text'
									label='Company Location'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
							</div>
							<br />
							<div className={classes.company}>
								<Field
									className={classes.field}
									component={TextField}
									name='type'
									type='text'
									label='Company type'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
								<br />
								<Field
									className={classes.field}
									component={TextField}
									name='tag'
									type='text'
									label='Company Tag'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
							</div>
							<br/>
							<Field
								className={classes.field}
								component={TextField}
								name='description'
								type='text'
								label='Company description'
								variant='outlined'
								InputProps={{
									className: classes.fieldInput1,
								}}
							/>
							<br/>
							<Field
								className={classes.field}
								component={TextField}
								name='numberemp'
								type='text'
								label='No of employess in company'
								variant='outlined'
								InputProps={{
									className: classes.fieldInput1,
								}}
							/>
							<br/>
							<Field
								className={classes.field}
								component={TextField}
								name='email'
								type='email'
								label='Email Id'
								variant='outlined'
								InputProps={{
									className: classes.fieldInput1,
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
									className: classes.fieldInput1,
								}}
							/>
							<br />
							<Field
								className={classes.field}
								component={TextField}
								type='password'
								label='Confirm Password'
								name='confirmPassword'
								variant='outlined'
								InputProps={{
									className: classes.fieldInput1,
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
								Sign Up
							</Button>
						</div>
						<br />
						<br />
					</Form>
				)}
			</Formik>
		</Grid>
	)
}

export default CompanySignup
