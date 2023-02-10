import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import AddClasswork from './AddWidgets/AddClasswork'
import AddSubject from './AddWidgets/AddSubject'
import AddNotes from './AddWidgets/AddNotes'
import AddLink from './AddWidgets/AddLink'
import AddJob from './AddWidgets/AddJob'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: '100vh',
	},
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
			<button type='button' onClick={handleOpen}>
				Open Modal
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
					{/* <AddSubject/> */}
					<AddClasswork />
					{/* <AddNotes /> */}
					{/* <AddLink /> */}
					{/* <AddJob /> */}
				</Fade>
			</Modal>
		</div>
	)
}
