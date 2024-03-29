import {
	Button,
	Typography,
	makeStyles,
	createStyles,
	Grid
} from '@material-ui/core'

import React,{useState} from 'react'
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
		fileinput: {
			paddingBottom:"5px",
			marginTop:"20px",
			borderBottom: "1px solid rgba(0,0,0,0.5)",
		},
		forminput: {
			border: "none",
			outline: "null",
			borderBottom: "1px solid rgba(0,0,0,0.5)",
			background: "#e0e0e0",
			width: "250px",
			
		},
		formpart: {
			minHeight:"100vh"
		},
	})
)

const AddResume = ({id,history}) => {
	const classes = useStyles()
	console.log(id);
    const [file, setfile] = useState("")
 
    const submit=(e)=>{
        e.preventDefault()
        let token = JSON.parse(localStorage.getItem("classmate"))
        if (!token) 
            history.push("/login")
        console.log(token.userId);
		const data = new FormData();
		data.set('encType','multipart/form-data')
		data.append("resume", file)
		data.append("id",token.userId)
        axios.post(" /student/AddResume",data)
        .then(res=>{
            console.log(res)
			window.location.reload()
        }).catch(err=>{
            console.log(err)
        })
    } 
	
	return (
		<Grid container justify="center" alignitems="center" className={classes.formpart}>
		<form className={classes.form} autoComplete='off' encType="multipart/form-data" onSubmit={submit}>
					<Typography variant='h5' component='h2' className={classes.title}>
						Add Resume
					</Typography>
					<div className={classes.fields}>
						<input type="file" name="content" required
						  accept="application/pdf" className={classes.fileinput} onChange={e => {
											const file = e.target.files[0];
											setfile(file)
									}}
						 />
						
						<br />

					</div>

					{/* Log In Action */}
					<div className={classes.action}>
						<Button
							className={classes.loginButton}
							variant='contained'
							type="submit"
							color='primary'
						>
							Add
						</Button>
					</div>
					<br />
					<br />
			</form>
			</Grid>
	)
}

export default AddResume