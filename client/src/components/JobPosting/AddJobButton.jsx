import AddIcon from '@material-ui/icons/Add';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
    },
    addicon: {
        
    }
}))

export default function AddAssignment({data}) {
    const history=useHistory()
    const classes = useStyles()
	const [open, setOpen] = React.useState(false)
    const navigate=()=>{
        let user=JSON.parse(localStorage.getItem('classmateRecruitor'))
        console.log(user)
        history.push(`/addjob/${user.compId}`)
    }
	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
    console.log(data);
	return (
        <div>
            <button onClick={()=>{navigate()}}>

                  <AddIcon color="secondary" size="large" onClick={handleOpen} style={{
                position: "absolute",
                fontSize: "50px",
                bottom: "10px",
                right: "20px",
            }} />
            </button>
    
		</div>
	)
}
