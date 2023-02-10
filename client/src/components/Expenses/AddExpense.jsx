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
import axios from 'axios'
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
			padding: '1rem',
			[theme.breakpoints.up('sm')]: {
				maxWidth: '400px',
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

const AddExpense = (props) => {
	const classes = useStyles()
	const initialValues = { expense: '', amount: null }

	const submit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			alert(JSON.stringify(values, null, 2))
		}, 500)
	}

	const validate = (values) => {
		const errors = {}
		if (!values.expense) {
			errors.expense = 'Required'
		}
		if (!values.amount) {
			errors.amount = 'Required'
		} else if (values.amount <= 0) {
			errors.amount = 'Invalid Amount'
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
							Add Expense
						</Typography>
						<div className={classes.fields}>
							<Field
								className={classes.field}
								component={TextField}
								name='expense'
								type='text'
								label='Expense'
								InputProps={{
									className: classes.fieldInput,
								}}
							/>
							<br />
							<Field
								className={classes.field}
								component={TextField}
								name='amount'
								type='number'
								label='Amount (₹)'
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
				)}
			</Formik>
		</Grid>
	)
}

export default AddExpense
