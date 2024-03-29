import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import NoteIcon from '@material-ui/icons/Note';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {CloudinaryContext,Image,Transformation} from 'cloudinary-react'

import Pdf from "../Pdf/Pdf"
const useStyles = makeStyles((theme) => ({
    root: {
        width: 275,
        height: "70px",
        margin: "10px auto",
        background:"rgba(0,0,0,0.1)",
        [theme.breakpoints.down("xs")]: {
            margin: "10px"
        }
    },
    title: {
        fontSize: 14,
    },
}));

export default function NoteCard({data}) {
  const classes = useStyles();
    const open = false
    return (
        <>
        <CloudinaryContext cloud_name='dw8ery8pa'>
            <Card className={classes.root} variant="outlined" container item justify="center" alignItem="center">
                <CardContent >
                    <Typography variant="h5" component="h2">
                        <NoteIcon size="large"/> {"  "}
                        {data.title}
                        <a href={data.link} target="_blank" download rel="noreferrer">
                            download
                            <Image publicid={data.title}>
                                <Transformation fetchFormat="auto" />
                            </Image>
                        </a>
                    </Typography>
                </CardContent>
            </Card>
                {
                    open===true?<Pdf data={data} />:<></>
                }
        </CloudinaryContext>
        </>
    );
}
