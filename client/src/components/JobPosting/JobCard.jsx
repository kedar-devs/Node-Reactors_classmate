import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios'
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


function JobCard({ status, element }) {
  const handleUpdate=(aid,status)=>{
    axios.put(`http://localhost:5000/classwork/addAssStatus/${ element.subid}`,{aid,status})
    .then(result=>{
        alert('Status Updated Succesfully')
        window.location.reload()

    })
    .catch(err=>{
        alert('An Unknown error Occured')
    })
}
  const classes = useStyles();
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
                        status==="working"?
              <Chip label="Working" color="primary" />:status==="review"?
              <Chip label="Reviewing" color="secondary" />:
              <Chip label="Completed"  />
                    }
                      {
                        status==="working"?
              <Chip label="Update" color="secondary" onClick={()=>{handleUpdate(element._id,0)}} />:status==="review"?
              <Chip label="Update" color="primary" onClick={()=>{handleUpdate(element._id,1)}} />:
              <></>
                    }
          </CardActions>
            </Card>
            </>
  );
}
export default JobCard