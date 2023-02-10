import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import UserAvatar from "./UserAvatar"
import AddResume from "./AddResume"
const useStyles = makeStyles((theme) => ({
    navbar: {
        height: "50px",
        background:"#3f51b5",
    },
}))
function Navbar() {
    const classes=useStyles()
    return (
        <Grid container className={classes.navbar}>
            <Grid item container>
                <AddResume />
                <UserAvatar />
            </Grid>
        </Grid>
    )
}

export default Navbar
