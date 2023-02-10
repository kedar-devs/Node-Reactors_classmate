import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import AddNotes from '../AddWidgets/AddNotes'
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
	},
}))

export default function TestModal({id}) {
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
            
            <AddIcon color="secondary" size="large" onClick={handleOpen} style={{
                position: "absolute",
                fontSize: "50px",
                bottom: "10px",
                right: "20px",
            }} />
            
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
					<AddNotes id={id} />
				</Fade>
			</Modal>
		</div>
	)
}
