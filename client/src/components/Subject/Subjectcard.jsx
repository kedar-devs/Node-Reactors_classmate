import React, { useEffect, useState } from 'react';
import { Grid, Typography } from "@material-ui/core"  
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { Link } from "react-router-dom"
import AddaSubject from "./AddASubject";
const bgarray = [
    "https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148235690.jpg",
    "https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background-design_23-2148237985.jpg",
    "https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_23-2148233991.jpg",
    "https://image.freepik.com/free-vector/colorful-flow-shapes-background_23-2148268742.jpg",
    "https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background_52683-21487.jpg",
    "https://image.freepik.com/free-vector/abstract-colorful-flow-shapes-background-design_23-2148237714.jpg",
]
const useStyles = makeStyles((theme) => ({
    subjectcard: {
        height: "150px",
        margin: "20px",
        width: "300px",
        borderRadius: "20px",
        boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        "& a": {
            textDecoration:"none"
        }
    },
    subjectname: {
        height: "100px",
        width: "100%",
        color: "white",
        margin:"10px 0 0px 20px"
    },
}))

            function Subjectcard({history}) {
                const classes = useStyles();
                const [data, setData] = useState([])
                useEffect(() => {
                    let token = JSON.parse(localStorage.getItem("classmate"))
                    if (!token)
                        history.push("/login")
                    else {
                        let p = [];
                        console.log(token.userId);
                        axios.get("http://localhost:5000/classwork/GetSub/" + token.userId)
                            .then(res => {
                                let k = []
                                console.log(res.data.Subject[0]);
                                for (let i = 1; i < res.data.Subject.length; i++) {
                                    k.push(res.data.Subject[i])
                                    console.log(res.data.Subject[i]);
                                }
                                console.log(k);
                                setData(k)
                            })
                            .catch(err => {
                                console.log("There is an error here in retriving data");
                                console.log(err);
                            })
                    }
                }, []);
                useEffect(() => {
                    console.log(data);
                }, [data]);
                return (
                    <>
                        <Grid container justify="space-around" alignItems="center">
                            {
                                data.map((e, i) =>
                                    <Grid className={classes.subjectcard} style={{ background: "linear-gradient(to left,rgba(0,0,0,.1),rgba(0,0,0,.5)),url(" + bgarray[`${i%4}`] + ")" }} container item alignItems="center"  md={3} sm={4} >
                                        <Link to={`/subject/${e._id}`}>
                                        <Grid container item direction="column" className={classes.subjectname} >
                                            <Typography>
                                                <b>
                                                    {e.Sname}
                                                </b>
                                            </Typography>
                                            <Typography>
                                                <b>
                                </b>
                                            </Typography>
                                        </Grid>
                                    </Link>
                                    </Grid>
                                )
                            }
                        </Grid>
                        <AddaSubject />
                    </>
                );
}

export default Subjectcard
