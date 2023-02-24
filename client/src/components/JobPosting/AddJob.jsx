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
import { useHistory,useParams } from 'react-router-dom'
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

const JobSignUp = ({ signUp, company }) => {
    const {id}=useParams()
	const history=useHistory()
	const classes = useStyles()
	const initialValues = {
		Role: '',
		JobType: '',
		jobTitle: '',
		Skills: '',
		description: '',
		duration: '',
		stipend: 0,
		vacancies: 0,
		
	}

	const submit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			console.log(id)
			axios.post(`http://localhost:5000/job/Create/${id}`,values)
				.then(res => {
				console.log("Company successfully added");
				history.push(`/company/${id}`)

				}).catch(err => {
					console.log("Error here in registering the user");
					console.log(err);
				})
		}, 500)
	}

	const validate = (values) => {
		const errors = {}
		if (!values.Role) {
			errors.Role = 'Required'
		}
		if (!values.Jobtype) {
			errors.Jobtype = 'Required'
		}
		if (!values.jobTitle) {
			errors.jobTitle = 'Required'
		}
		if (!values.Skills) {
			errors.Skills = 'Required'
		}
		if (!values.description) {
			errors.description = 'Required'
		}
		if (!values.stipend) {
			errors.stipend = 'Required'
		}
		if (!values.duration) {
			errors.duration = 'Required'
		}
		if (!values.vacancies) {
			errors.vacancies = 'Required'
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
									name='Role'
									type='text'
									label='Role'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
								<br />
								<Field
									className={classes.field}
									component={TextField}
									name='Jobtype'
									type='text'
									label='Job Type'
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
									name='jobTitle'
									type='text'
									label='Job Title'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
								<br />
								<Field
									className={classes.field}
									component={TextField}
									name='Skills'
									type='text'
									label='Skills Required'
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
									name='description'
									type='text'
									label='Job Description'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
								<br />
								<Field
									className={classes.field}
									component={TextField}
									name='stipend'
									type='number'
									label='Company stipend'
									variant='outlined'
									InputProps={{
										className: classes.fieldInput,
									}}
								/>
                                <br />
							</div>
                            <br />
							<Field
								className={classes.field}
								component={TextField}
								name='duration'
								type='number'
								label='Duration(in Months)'
                                placeholder="place -1 for full time"
								variant='outlined'
								InputProps={{
									className: classes.fieldInput1,
								}}
							/>
                              <br />
                            <Field
								className={classes.field}
								component={TextField}
								name='vacancies'
								type='number'
								label='vacancies'
                                placeholder="place -1 for full time"
								variant='outlined'
								InputProps={{
									className: classes.fieldInput1,
								}}
							/>
                              <br />
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
								Submit
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

export default JobSignUp
