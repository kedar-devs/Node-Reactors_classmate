import { createStyles, Grid, makeStyles, Typography } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import Expense from './Expense'

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

function Expenses() {
	const [expenses,setExpense]=useState([{record:[]}])
	const [loading,setLoading]=useState(true)
	useEffect(()=>{
		let user = JSON.parse(localStorage.getItem("classmate"))
		Axios.get(`http://localhost:5000/finance/getExpenses/${user.userId}`)
		.then(res=>{
			console.log(res.data)
			setExpense(res.data.user)
			setLoading(false)
		})
		.catch(err=>{
			console.log(err)
			alert('Something Went Wrong')
		})
	},[])
	const classes = useStyles()
	return (
		<Grid container>
			<Typography variant='h3' component='h1' className={classes.heading}>
				Expenses
			</Typography>
			{!loading?
			<Grid
				container
				// direction='column'
				 justify='center'
				// alignItems='flex-start'
				spacing={2}
				className={classes.root}
			>
				{expenses.map((expense) => (
					<Grid item key={expense._id} xs={12}>
						<Expense expense={expense.record[0]} />
					</Grid>
				))}
			</Grid>:<></>}
		</Grid>
	)
}

export default Expenses
