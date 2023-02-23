import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import JobPage from './../JobPosting/JobPage'
import AddJobButton from './../JobPosting/AddJobButton'

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			padding: '2rem',
		},
		heading: {
			padding: '1rem',
			marginBottom: '0',
		},
	})
)

const CompanySideBar = (props) => {
    const [jobs,setJobs]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
            let user=JSON.parse(localStorage.getItem('classmateRecruitor'))
            Axios.get(`http://localhost:5000/job/GetByCompany/${user.compId}`)
            .then(res=>{
                setJobs(res.data.FoundJob)
                setLoading(false)
            })
    },[])
	const classes = useStyles()
	return (
        <>
        {!loading?
		<Grid container>
			<Typography variant='h3' component='h1' className={classes.heading}>
				Internships & Jobs
			</Typography>
			<Grid container spacing={3} className={classes.root}>
				{jobs.map((job) => {
					return (
						<Grid item xs={12} sm={6} md={3} key={job.id}>
							<JobPage job={job} />
						</Grid>
					)
				})}
			</Grid>
		</Grid>:<></>}
        <AddJobButton />
        </>
	)
}

export default CompanySideBar
