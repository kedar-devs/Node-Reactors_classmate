import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade' 
import AddSubject from "../AddWidgets/AddSubject"
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
    },
    btn: {
        background: "none",
        boxShadow: "none",
        border: "none",
        
    }
}))

export default function TestModal() {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <button type='button' onClick={handleOpen} className={classes.btn}>
				
                <AddIcon color="secondary" size="large" onClick={handleOpen} style={{
                    position: "absolute",
                    fontSize: "50px",
                    bottom: "10px",
                    right: "20px",
                }} />
            </button>
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
                    <AddSubject />
                </Fade>
            </Modal>
        </div>
    )
}