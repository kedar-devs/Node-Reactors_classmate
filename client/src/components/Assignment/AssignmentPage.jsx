// import React,{useState,useEffect} from 'react'
import AssignmentSection from './AssignmentSection'
import { Grid } from "@material-ui/core"
import axios from "axios"

import React, { Component } from 'react'
import AddAssignment from './AddAssignment'


export default class AssignmentPage extends Component {
    constructor(props) {
        super(props)
        this.state= {
            works: [],
            reviews: [],
            dones:[],
        }
      
    }
    
    componentDidMount() {
           let token = JSON.parse(localStorage.getItem("classmate"))
        if (!token)
            this.props.history.push("/login")
        console.log(token.userId);
        axios.get(" /classwork/GetAssignment/" + this.props.id)
            .then(res => {
                let work = []
                let review = []
                let completed = []
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    // k.push(res.data[i])
                    console.log(res.data[i].statuse);
                    if (res.data[i].statuse === -1)
                        work.push(res.data[i])
                    else if (res.data[i].statuse === 0)
                        review.push(res.data[i])
                    else
                        completed.push(res.data[i])
                }
                console.log(work);
                console.log(review);
                console.log(completed);
                this.setState({
                    works: work,
                    reviews: review,
                    dones:completed
                })
            })
            .catch(err => {
                console.log("There is an error here in retriving assignment data");
                console.log(err);
            });
    }
    
    render() {
        return (
            <>
        <Grid container item direction="row" justify="space-around">
            <AssignmentSection status="working" data={this.state.works} />
                <AssignmentSection status="review" data={this.state.reviews} />
                    <AssignmentSection status="done" data={this.state.dones}/>
                </Grid>
                    <AddAssignment data={this.props.id} />
                </>
        )
    }
}
