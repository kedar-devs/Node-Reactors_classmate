import React,{useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core"
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BookIcon from '@material-ui/icons/Book';
import LinkIcon from '@material-ui/icons/Link';
import {CardActionArea} from '@material-ui/core';
import AssignmentPage from '../Assignment/AssignmentPage';
import axios from "axios"
import Notespage from '../Notes/Notespage';
import LinkPage from "../LinkCard/LinkPage"
import Analytics from '../Analytics/Analytics';
const useStyles = makeStyles((theme) => ({
    sidebar: {
        minHeight: "calc(100vh - 50px)",
        height:"auto",
        background: "#3f51b5",
        flexDirection:"column",
        [theme.breakpoints.down("xs")]: {
            minHeight: "50px",
            flexDirection: "row",
            display:"flex"
        }
    },
    sidebaricons: {
        color:"white"
    },
    sidebarheading: {
        color: "white",
        fontSize:"13px"
    },
    sidebarsections: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100px",
        [theme.breakpoints.down("xs")]: {
            minHeight:"auto"
        }
    }
}))
function Sidebar({match}) {
    const classes = useStyles();
    console.log(match.params.id);
    const [opens, setOpens] = useState(0)
    return (
        <>
        <Grid container>
            <Grid container item sm={2} md={1}  direction="column">
                <Grid className={classes.sidebar}>
                        <Grid container item justify="center" alignItems="center" xs={3} sm={12} onClick={() => {
                            setOpens(0);
                            console.log(opens)
                }}>
                    <CardActionArea className={classes.sidebarsections}> 
                        <AssignmentIcon className={classes.sidebaricons}/>
                        <Typography className={classes.sidebarheading}>Assignments</Typography>
                    </CardActionArea>
                </Grid>
                <Grid container item justify="center" alignItems="center" xs={3}sm={12} onClick={() => {
                            setOpens(1)
                            console.log(opens)
                }}>
                    <CardActionArea className={classes.sidebarsections}>
                        <BookIcon className={classes.sidebaricons}/>
                        <Typography className={classes.sidebarheading}>Notes</Typography>
                    </CardActionArea>
                </Grid>
                <Grid container item justify="center" alignItems="center" xs={3}sm={12} onClick={() => {
                            setOpens(2)
                            console.log(opens)
                }}>
                    <CardActionArea className={classes.sidebarsections}>
                        <AssessmentIcon className={classes.sidebaricons}/>
                        <Typography className={classes.sidebarheading}>Performance</Typography>
                    </CardActionArea>
                </Grid>
                <Grid container item justify="center" alignItems="center" xs={3}sm={12} onClick={() => {
                            setOpens(3)
                            console.log(opens)
                }}>
                    <CardActionArea className={classes.sidebarsections}>
                        <LinkIcon className={classes.sidebaricons}/>
                        <Typography className={classes.sidebarheading}>Links</Typography>
                    </CardActionArea>
                </Grid>
                </Grid>
                </Grid>
                <Grid container item sm={10} md={11}>
                    {
                        opens==0?
                            <AssignmentPage id={match.params.id} /> : opens == 1?
                        <Notespage id={match.params.id}/>:opens==2?<Analytics id={match.params.id} />: <LinkPage id={match.params.id} />
                    }
            </Grid>
            </Grid>      
        </>    
    )
}

export default Sidebar
