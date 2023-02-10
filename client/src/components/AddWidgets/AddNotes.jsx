import {
	Button,
	Typography,
	makeStyles,
	createStyles,
	Grid
} from '@material-ui/core'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import React,{useState} from 'react'
import axios from 'axios'
import { id } from 'date-fns/locale'
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

const AddNotes = ({id}) => {
	const classes = useStyles()
	console.log(id);
    const [name,setname]=useState("")
    const [file, setfile] = useState("")
    const [img,setImage]=useState("")
    const uploadpic=(e)=>{
        setfile(e.target.value)
    }
    const submit=(e)=>{
        e.preventDefault()
		const data = new FormData();
		data.set('encType','multipart/form-data')
        data.append("title",name)
		data.append("content", file)
		data.append("subid",id)
        const multerimage=URL.createObjectURL(file)
        alert(multerimage)
        axios.put("http://localhost:5000/classwork/addNotes/"+id,data)
        .then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    } 
	
	return (
		<Grid container justify="center" alignitems="center" className={classes.formpart}>
		<form className={classes.form} autoComplete='off' encType="multipart/form-data" onSubmit={submit}>
					<Typography variant='h5' component='h2' className={classes.title}>
						Add Notes
					</Typography>
					<div className={classes.fields}>
						<input
							className={classes.field}
							component={TextField}
							name='title'
							type='text'
							placeholder='Notes Title'
							InputProps={{
								className: classes.fieldInput,
					}}
					className={classes.forminput}
							onChange={e=>{
								const {value}=e.target
								setname(value)
							}} 
		/>
						<br />
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

export default AddNotes
// import React, { useState,useEffect } from 'react'
// import axios from "axios";
// function Uploadfile() {
//     const [name,setname]=useState("")
//     const [file, setfile] = useState("")
//     const [img,setImage]=useState("")
//     const uploadpic=(e)=>{
//         setfile(e.target.value)
//     }
//     const submit=(e)=>{
//         e.preventDefault()
//         const data=new FormData();
//         data.append("name",name)
//         data.append("file",file)
//         const multerimage=URL.createObjectURL(file)
//         alert(multerimage)
//         axios.post("http://localhost:5000/user/upload",data)
//         .then(res=>{
//             console.log(res)
//         }).catch(err=>{
//             console.log(err)
//         })
//     }
//     return (
//         <>
// <form class="uploadfile" encType="multipart/form-data" onSubmit={submit}>
    
//     <input type="text" placeholder="name" name="name" onChange={e=>{
//         const {value}=e.target
//         setname(value)
//     }} />
//     <input type="file" name="file" onChange={e=>{
//         const file=e.target.files[0];
//         setfile(file)}}/>
//     <button type="submit">Upload now</button>
// </form>
// </>
//     )
// }
// export default Uploadfile