import {
	Button,
	LinearProgress,
	Typography,
	makeStyles,
	createStyles,
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import React from 'react'
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
function validURL(str) {
	var pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$',
		'i'
	) // fragment locator
	return !!pattern.test(str)
}

const AddLink = ({id,history}) => {
	//const navigator=useNavigate()
	const classes = useStyles()
	const initialValues = { title: '', link: null,subid:id }

	const submit = (values, { setSubmitting }) => {
		setTimeout(() => {
			setSubmitting(false)
			axios.put(" /classwork/addLink/" + id, {
				title: values.title,
				link: values.link,
				subid: id
			})
				.then(res => {
					console.log("data successfully entered")
					console.log(res);
					window.location.reload()
				}).catch(err => {
					console.log("There is an error in add a link");
					console.log(err);
				});
		}, 500);
	}

	const validate = (values) => {
		const errors = {}
		if (!values.title) {
			errors.title = 'Required'
		}
		if (!values.link) {
			errors.link = 'Required'
		} else if (!validURL(values.link)) {
			errors.link = 'Invalid Link URL'
		}
		return errors
	}
	return (
		<Formik initialValues={initialValues} validate={validate} onSubmit={submit}>
			{({ submitForm, isSubmitting }) => (
				<Form className={classes.form} autoComplete='off'>
					<Typography variant='h5' component='h2' className={classes.title}>
						Add Link
					</Typography>
					<div className={classes.fields}>
						<Field
							className={classes.field}
							component={TextField}
							name='title'
							type='text'
							label='Link Title'
							InputProps={{
								className: classes.fieldInput,
							}}
						/>
						<br />
						<Field
							className={classes.field}
							component={TextField}
							name='link'
							type='text'
							label='Link URL'
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

export default AddLink
