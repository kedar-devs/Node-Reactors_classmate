import {
	Button,
	LinearProgress,
	Typography,
	makeStyles,
	createStyles,
	MenuItem,
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import { DatePicker } from 'formik-material-ui-pickers'
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
		selectbox: {
			[theme.breakpoints.down("xs")]: {
				minWidth: "180px",
			}
		}
	})
)

const status = [
	{
		value: 'none',
		label: 'None',
	},
	{
		value: '-1',
		label: 'Working',
	},
	{
		value: '0',
		label: 'Under Review',
	},
	{
		value: '1',
		label: 'Complete',
	},
]
// const priority = [
// 	{
// 		value: 'low',
// 		label: 'Low',
// 	},
// 	{
// 		value: 'medium',
// 		label: 'Medium',
// 	},
// 	{
// 		value: 'high',
// 		label: 'High',
// 	},
// ]

const AddClasswork = ({id}) => {
	const classes = useStyles()
	const initialValues = {
		aname: '',
		grades: null,
		status: 'none',
		// priority: 'medium',
		dueDate: new Date(),
		content: '',
		subid:id,
	}
	const submit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			console.log(values);
			console.log(id);
			let token = JSON.parse(localStorage.getItem("classmate"))
			axios.put("http://localhost:5000/classwork/addAssign/" + token.userId, {
				aname:values.aname,
				grades: values.grades,
				dueDate: values.dueDate,
				content:values.content,
				subid:id,
			})
				.then(res => {
					console.log("data successfully entered")
					console.log(res);
					// history.push("/subject/"+id)
				}).catch(err => {
					console.log("There is an error in add an assignment");
					console.log(err);
				});
		}, 500)
	}

	const validate = (values) => {
		const errors = {}
		if (!values.aname) {
			errors.aname = 'Required'
		}
		if (values.grades && (values.grades <= 0 || values.grades > 100)) {
			errors.grades = 'Invalid Grades'
		}
		if (values.status === 'none') {
			errors.status = 'Required'
		}
		return errors
	}
	return (
		<Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
			{({ submitForm, isSubmitting }) => (
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Form className={classes.form} autoComplete='off'>
						<Typography variant='h5' component='h2' className={classes.title}>
							Add Classwork
						</Typography>
						<div className={classes.fields}>
							<Field
								className={classes.field}
								component={TextField}
								name='aname'
								type='text'
								label='Classwork Name'
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							<br />
							<Field
								className={classes.field}
								component={TextField}
								name='grades'
								type='number'
								label='Grades (%)'
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							<br />
							<Field
								className={classes.selectbox}
								component={TextField}
								type='text'
								name='status'
								label='Status'
								select
								variant='standard'
								// helperText='Please select the status'
								margin='normal'
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									className: classes.fieldInput,
								}}
							>
								{status.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Field>
							<br />
							{/* <Field
								component={TextField}
								type='text'
								name='priority'
								label='Priority'
								select
								variant='standard'
								// helperText='Please select the status'
								margin='normal'
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									className: classes.fieldInput,
								}}
							>
								{priority.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Field> */}
							<br />
							<Field
								component={DatePicker}
								name='date'
								label='Date'
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							<br />
							<Field
								className={classes.field}
								component={TextField}
								name='content'
								type='text'
								label='Description'
								multiline
								placeholder='Add short description'
								rows={2}
								rowsMax={5}
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

export default AddClasswork
