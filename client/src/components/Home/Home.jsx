import { Grid, Typography } from '@material-ui/core'
import React,{useEffect} from 'react'
import classwork from "../../assets/subjects.svg"
import finance from "../../assets/money.svg"
import internships from "../../assets/jobs.svg"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import axios from "axios"
const useStyles = makeStyles((theme) => ({
    svgicon: {
        width: "180px",
        height:"150px",
        [theme.breakpoints.down("xs")]: {
            height: "auto",
        }
    },
    selectionicons: {
        minHeight: "calc(100vh - 50px)",
        marginTop: "50px",
        "& a": {
            color: "black",
            textDecoration: "none",
        },
        [theme.breakpoints.down("xs")]: {
            flexDirection:"column"
        },
    },
    title: {
        fontSize: "30px",
        margin: "20px auto",
        textTransform: "capitalize",
        [theme.breakpoints.down("sm")]: {
            fontSize: "25px"
        },
        [theme.breakpoints.down("xs")]: {
            margin: "0 auto 50px auto",
            fontSize: "20px",
        }
    }
}))
function Home({history}) {
    const classes = useStyles()
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("classmate"))
        if (!token) 
            history.push("/login")
        console.log(token.userId);
       
    }, [])
    return (
            <Grid container item  justify="space-around" alignItems="center" className={classes.selectionicons}>
            {
                [
                    {
                        name: "subjects",
                        photo: classwork,
                        route:'/subjects'
                    },
                    {
                        name: "internships",
                        photo:internships,    
                        route:'/jobs'
                    },
                    {
                        name: "finance",
                        photo: finance,
                        route:'/loans'
                    }
                ].map((e, i) => 
                    <Link to={e.route} key={i}>
                        <Grid container item sm={4} justify="center" alignItems="center" direction="column" >
                            <img src={e.photo} alt="jobs" className={classes.svgicon} />
                            <Typography className={classes.title}>{e.name}</Typography>
                        </Grid>
                    </Link>
                )
            }
        </Grid>
    )
}

export default Home
