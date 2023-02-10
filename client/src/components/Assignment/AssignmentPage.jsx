// import React,{useState,useEffect} from 'react'
import AssignmentSection from './AssignmentSection'
import { Grid } from "@material-ui/core"
import axios from "axios"
import {Link} from "react-router-dom"
// function AssignmentPage({history}) {
//     // console.log(working);
//     // console.log(review);
//     // console.log(completed);
//     const [workingassignments, setWorkingassignments] = useState([])
//     const [reviewassignments, setReviewassignments] = useState([])
//     const [doneassignments, setDoneassignments] = useState([])
//     useEffect(() => {
//         let token = JSON.parse(localStorage.getItem("classmate"))
//         if (!token)
//             history.push("/login")
//         let p = [];
//         console.log(token.userId);
//         axios.get("http://localhost:5000/classwork/GetAssignment/" + token.userId)
//             .then(res => {
//                 let work = []
//                 let review = []
//                 let completed = []
//                 console.log(res.data);
//                 for (let i = 1; i < res.data.length; i++) {
//                     // k.push(res.data[i])
//                     console.log(res.data[i].statuse);
//                     if (res.data[i].statuse == -1)
//                         work.push(res.data[i])
//                     else if (res.data[i].statuse == 0)
//                         review.push(res.data[i])
//                     else
//                         completed.push(res.data[i])
//                 }
//                 console.log(work);
//                 console.log(review);
//                 console.log(completed);
//                 setWorkingassignments(work)
//                 setReviewassignments(review)
//                 setDoneassignments(completed)
//                 console.log(workingassignments)
//                 console.log(reviewassignments);
//                 console.log(doneassignments);
//             })
//             .catch(err => {
//                 console.log("There is an error here in retriving assignment data");
//                 console.log(err);
//             });
//     }, []);
//     useEffect(() => {
        
//     }, [workingassignments,reviewassignments,doneassignments])
    
//     return (
//         <Grid container item direction="row" justify="space-around">
//             <AssignmentSection status="working" />
//             <AssignmentSection status="review" />
//             <AssignmentSection status="done" />
//         </Grid>
//     )
// }

// export default AssignmentPage
import React, { Component } from 'react'
import AddAssignment from './AddAssignment'
import AddIcon from '@material-ui/icons/Add';

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
        let p = [];
        console.log(token.userId);
        axios.get("http://localhost:5000/classwork/GetAssignment/" + this.props.id)
            .then(res => {
                let work = []
                let review = []
                let completed = []
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    // k.push(res.data[i])
                    console.log(res.data[i].statuse);
                    if (res.data[i].statuse == -1)
                        work.push(res.data[i])
                    else if (res.data[i].statuse == 0)
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
        console.log(this.state.dones);
        console.log(this.state.reviews);
        console.log(this.state.works);
        console.log(this.props.id)
        return (
            <>
        <Grid container item direction="row" justify="space-around">
            <AssignmentSection status="working" data={this.state.works} />
                <AssignmentSection status="review" data={this.state.reviews}/>
                    <AssignmentSection status="done" data={this.state.dones}/>
                </Grid>
                    <AddAssignment data={this.props.id} />
                </>
        )
    }
}
