import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
    root: {
        width: 275,
        margin: "10px auto",
        background:"rgba(0,0,0,0.1)",
        [theme.breakpoints.down("xs")]: {
            margin: "10px"
        },
    },
    link: {
        textDecoration:"none"
    },
    title: {
        fontSize: 14,
    },
}));

export default function NoteCard({data}) {
  const classes = useStyles();

    return (
        <>
            <a href={"http://"+data.link} target="_blank" className={classes.link}>
                <Card className={classes.root} variant="outlined" container item  justify="center" alignItem="center">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <AttachmentIcon size="large"/> {"  "}
                            {data.title}
                        </Typography>
                    </CardContent>
                </Card>
            </a>
        </>
    );
}
