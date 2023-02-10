import React from 'react'
import { Button, Grid, Typography } from "@material-ui/core"
import notes from "../../assets/homepagenotetaker.svg"
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    svgimage: {
        width: "400px",
        [theme.breakpoints.down("sm")]: {
            width:"300px",
        }
    },
    landingpage: {
        minHeight: "calc(100vh - 50px)",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent:"center"
        }
    },
    welcomemesssage: {
        fontSize: "40px",
        fontFamily:"Poppins, sans-serif;",
        color:"#3f51b5",
        [theme.breakpoints.down("sm")]: {
            fontSize: "25px",
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: "20px",
        }
    },
    tagline: {
        fontSize: "20px",
        margin:"10px auto",
        [theme.breakpoints.down("sm")]: {
            fontSize:"15px"
        }
    },
    btns: {
        marginTop: "30px",
        "& button": {
            marginRight:"50px",
            [theme.breakpoints.down("xs")]: {
                marginRight: "20px",
            }
        }
    }
}))
function Landingpage() {
    const classes=useStyles()
    return (
        <Grid container className={classes.landingpage} alignItems="center" >
            <Grid container direction="column" item sm={6}>
                <Typography className={classes.welcomemesssage}>
                    Welcome to Class - Mate
                </Typography>
                <Typography className={classes.tagline}>
                    The new way to organize your study 
                </Typography>
                <Grid item sm={12} container justify="center" className={classes.btns} alignItems="center">
                <Link to='/signup' style={{textDecoration:'none'}}>
                <Button variant="contained" color="primary">
                        Join us
                </Button>
                    </Link>
                    <Link to='/login' style={{textDecoration:'none'}}>
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                    </Link>
                    
                </Grid>
            </Grid>
            <Grid item sm={6}>
                <img src={notes} alt="tracker" className={classes.svgimage} />
            </Grid>
        </Grid>
    )
}

export default Landingpage
