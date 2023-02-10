import {
	Button,
	LinearProgress,
	Typography,
	makeStyles,
	createStyles,
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import React from 'react'
import axios from 'axios'
const useStyles = makeStyles((theme) =>
	createStyles({
		// root: {
		// 	minHeight: '100vh',
		// },
		title: {
			textAlign: 'center',
			marginBottom: '0.5rem',
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
			padding: '1rem',
			width: '280px',
			[theme.breakpoints.up('sm')]: {
				width: '320px',
			},
		},
		fields: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		fieldInput: {
			[theme.breakpoints.up('sm')]: {
				width: '250px',
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

const AddJob = (props) => {
	const classes = useStyles()
	const initialValues = {
		job: '',
		post: '',
		description: '',
		type: '',
		skills: '',
	}

	const submit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			alert(JSON.stringify(values, null, 4))
		}, 500)
	}

	const validate = (values) => {
		const errors = {}
		if (!values.job) {
			errors.job = 'Required'
		}
		if (!values.post) {
			errors.post = 'Required'
		}
		if (!values.description) {
			errors.description = 'Required'
		}
		if (!values.type) {
			errors.type = 'Required'
		}
		if (!values.skills) {
			errors.skills = 'Required'
		}

		return errors
	}
	return (
		<Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
			{({ submitForm, isSubmitting }) => (
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Form className={classes.form} autoComplete='off'>
						<Typography variant='h5' component='h2' className={classes.title}>
							Add Job/Internship
						</Typography>
						<div className={classes.fields}>
							<Field
								className={classes.field}
								component={TextField}
								name='job'
								type='text'
								label='Job'
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							<br />
							<Field
								className={classes.field}
								component={TextField}
								name='post'
								type='text'
								label='Job Post'
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							<br />
							<Field
								className={classes.field}
								component={TextField}
								name='description'
								type='text'
								label='Description'
								multiline
								placeholder='Add Description'
								rows={2}
								rowsMax={5}
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							<br />
							<Field
								className={classes.field}
								component={TextField}
								name='type'
								type='text'
								label='Type'
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							<br />

							<Field
								className={classes.field}
								component={TextField}
								name='skills'
								type='text'
								label='Skills'
								multiline
								placeholder='Add Skills'
								rows={2}
								rowsMax={5}
								InputProps={{
									className: classes.fieldInput,
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
								Add
							</Button>
						</div>
						<br />
						<br />
					</Form>
				</MuiPickersUtilsProvider>
			)}
		</Formik>
	)
}

export default AddJob
