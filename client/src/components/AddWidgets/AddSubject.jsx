import {
	Button,
	LinearProgress,
	Typography,
	makeStyles,
	createStyles,
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import React,{useEffect} from 'react'

import axios from 'axios'
const useStyles = makeStyles((theme) =>
	createStyles({
		// root: {
		// 	minHeight: '100vh',
		// },
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

const AddSubject = ({history}) => {
	const classes = useStyles()
	const initialValues = { sname: '', faculty: null }
	useEffect(() => {
        let token = JSON.parse(localStorage.getItem("classmate"))
        if (!token) 
            history.push("/login")
        console.log(token.userId);
	}, [])
	const submit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			console.log(values)
			let token = JSON.parse(localStorage.getItem("classmate"))
			
			axios.put("http://localhost:5000/classwork/addSubject/" + token.userId, values)
				.then(res => {
					console.log("Successfully added a subject");
					console.log(res);
					window.location.reload()
				}).catch(err => {
					console.log("There is an error here in adding the subject");
					console.log(err);
			})
		}, 500)
	}

	const validate = (values) => {
		const errors = {}
		if (!values.sname) {
			errors.sname = 'Required'
		}
		if (!values.faculty) {
			errors.faculty = 'Required'
		} else if (values.faculty <= 0) {
			errors.faculty = 'Invalid Duration'
		}
		return errors
	}
	return (
		<Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form} autoComplete='off'>
					<Typography variant='h5' component='h2' className={classes.title}>
						Add Subject
					</Typography>
					<div className={classes.fields}>
						<Field
							className={classes.field}
							component={TextField}
							name='sname'
							type='text'
							label='Subject Name'
							InputProps={{
								className: classes.fieldInput,
							}}
						/>
						<br />
						<Field
							className={classes.field}
							component={TextField}
							name='faculty'
							type='number'
							label='Subject Duration (Weeks)'
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
	)
}

export default AddSubject
