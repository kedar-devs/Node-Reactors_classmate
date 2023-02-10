import {
	Button,
	Chip,
	createStyles,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core'
import React from 'react'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import jobs from './jobData'
import { useParams } from 'react-router-dom'
import axios from "axios"
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: '2rem',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		companyIcon: {
			fontSize: '300px',
		},
		img: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
			alignItems: 'center',
		},
		icon: {
			marginRight: 5,
		},
		title: {
			fontSize: '2.5rem',
			fontWeight: 200,
			[theme.breakpoints.down('sm')]: {
				fontSize: '1.8rem',
				marginTop: '1.5rem',
			},
		},
		subtitle: {
			marginBottom: 5,
			marginTop: 3,
			display: 'flex',
			alignItems: 'center',
		},
		main: {
			// padding: '1rem',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
		},
		job: {
			fontWeight: 800,
		},
		chip: {
			padding: '0.2rem',
			marginTop: '0.5rem',
		},

		description: {
			marginTop: '1.5rem',
			padding: '0.5rem',
			dispay: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
		},
		properties: {
			fontWeight: 800,
			fontSize: '1.2rem',
			marginRight: '0.5rem',
		},
		values: {},
		mainDesc: {
			display: 'flex',
			flexDirection: 'column',
		},
	})
)

const JobDescription = ({history}) => {
	const classes = useStyles()
	let { id } = useParams()
	id = parseInt(id)
	const job = jobs.filter((j) => j.id === id)[0]
	const submitresume = () => {
        let token = JSON.parse(localStorage.getItem("classmate"))
        if (!token) 
            history.push("/login")
        console.log(token.userId);
		axios.post("http://localhost:5000/student/ApplyJob/",{
			empemail: job.email,
			userId: token.userId
		}).then(res => {
			console.log("sucessfully applied for job");
			console.log(res);
		}).catch(err => {
			console.log("there is an error here in applying for job");
			console.log(err);
		});
	}
	return (
		<>
		<Grid
			container
			className={classes.root}
			justify='center'
			alignItems='center'
		>
			{/* Company Logo */}
			<Grid item xs={12} md={4} className={classes.img}>
				<LinkedInIcon className={classes.companyIcon} />
				<Button variant='contained' color='primary' onClick={submitresume}>
					Apply
				</Button>
			</Grid>
			{/* Job Description */}
			<Grid item xs={12} md={8}>
				{/* Main */}
				<div className={classes.main}>
					<Typography className={classes.title}>{job.companyName}</Typography>
					<Typography className={classes.subtitle}>
						<LocationOnIcon className={classes.icon} /> {job.location}
					</Typography>
					<Typography variant='h5' component='h2' className={classes.job}>
						{job.job}
						<br />
						<Chip
							color='secondary'
							size='small'
							label={job.post}
							className={classes.chip}
						/>
					</Typography>
				</div>
				<hr />
				{/* Description */}
				<div className={classes.description}>
					<Typography className={classes.subtitle}>
						<span className={classes.properties}>
							Recruiter's Name (SPOC):{' '}
						</span>{' '}
						<span
							className={classes.values}
						>{`${job.firstName} ${job.lastName}`}</span>
					</Typography>
					<Typography className={classes.subtitle}>
						<span className={classes.properties}>Email: </span>{' '}
						<span className={classes.values}>
							<a href={`mailto:${job.email}`}>{job.email}</a>
						</span>
					</Typography>
					<Typography className={classes.subtitle}>
						<span className={classes.properties}>Number of Employees: </span>{' '}
						<span className={classes.values}>{job.noOfEmp}</span>
					</Typography>
					<Typography className={classes.subtitle}>
						<div className={classes.mainDesc}>
							<span className={classes.properties}>Description: </span>
							<span className={classes.values}>{job.description}</span>
						</div>
					</Typography>
					<Typography className={classes.subtitle}>
						<span className={classes.properties}>Type: </span>
						<span className={classes.values}>{job.type}</span>
					</Typography>
					<Typography className={classes.subtitle}>
						<div className={classes.mainDesc}>
							<span className={classes.properties}>Skills: </span>

							<span className={classes.values}>{job.skills}</span>
						</div>
					</Typography>
				</div>
			</Grid>
			</Grid>
	</>		
	);
}

export default JobDescription
