import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AddResume from '../AddWidgets/AddResume'
import axios from "axios"
const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
    },
        resume: {
        color: "white",
        position: "absolute",
        top: "13px",
        right:"70px"
    }

}))

export default function AddResumes(history) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        let token = JSON.parse(localStorage.getItem("classmate"))
        if (!token) 
            history.push("/login")
        console.log(token.userId);
        axios.get("http://localhost:5000/student/user/" + token.userId)
            .then(res => {
            console.log(res.data);
            }).catch(err => {
            console.log(err);
        })
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <AssignmentIndIcon className={classes.resume} onClick={handleOpen} />
            <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <AddResume />
                </Fade>
            </Modal>
        </div>
    )
}