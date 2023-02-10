import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    root: {
        width: 275,
        margin: "10px auto",
        background:"rgba(0,0,0,0.1)",
        [theme.breakpoints.down("xs")]: {
            margin: "10px"
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    badges: {
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 15px"
    }
}));

function AssignmentCard({ status, element }) {
  const classes = useStyles();
  // console.log(element);
    return (
      <>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
            {element.Aname}
        </Typography>
        <Typography variant="body2" component="p">
         {element.content}
                  <br />
        </Typography>
      </CardContent>
                <CardActions className={classes.badges}>
                    {
                        status=="working"?
              <Chip label="Working" color="primary" />:status=="review"?
              <Chip label="Reviewing" color="secondary" />:
              <Chip label="Completed"  />
                    }
              {/* <Chip variant="outlined" label="20" /> */}
          </CardActions>
            </Card>
    {/* <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
            Assignment Name
        </Typography>
        <Typography variant="body2" component="p">
         Lorem ipsum dolor sit amet.
                  <br />
        </Typography>
      </CardContent>
      <CardActions className={classes.badges}>
              <Chip label="for review" color="secondary" />
              {/* <Chip variant="outlined" label="20" /> 
          </CardActions>
            </Card>
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
            Assignment Name
        </Typography>
        <Typography variant="body2" component="p">
         Lorem ipsum dolor sit amet.
                  <br />
        </Typography>
      </CardContent>
      <CardActions className={classes.badges}>
              <Chip label="completed"  />
              <Chip variant="outlined" label="20" />
          </CardActions>
            </Card> */}
            </>
  );
}
export default AssignmentCard