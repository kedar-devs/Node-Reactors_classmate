import { Grid } from '@material-ui/core'
// import React,{useState,useEffect} from 'react'
import LinkCard from "./LinkCard"
import axios from "axios"
// function LinkPage() {
//     return (
//         <Grid container item >
//             <Grid item md={4} sm={6} container justify="center" alignItems="center" xs={12}>
//                 <LinkCard />
//             </Grid>
//         </Grid>
//     )
// }

// export default LinkPage

import React, { Component } from 'react'
import AddALink from "./AddALink"
export default class LinkPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[]
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/classwork/GetNotesExt/" + this.props.id)
        .then(res => {
            let k=[]
            console.log(res.data.Notes[0]);
            for (let i = 1; i < res.data.Notes[0].length; i++) {
                    console.log(res.data.Notes[0][i]);
                    k.push(res.data.Notes[0][i])
                }
                console.log(k);
                this.setState({ data: k })
                
            }).catch(err => {
                console.log("There is error here in retriving the links");
                console.log(err);
            });
        }
        
        render() {
            return (
                <>
                    <Grid container item >
                        {
                            this.state.data.map((e, i) =>
                                <Grid item md={4} key={i} sm={6} container justify="center" alignItems="center" xs={12}>
                                    <LinkCard data={e} />
                                </Grid>
                            )
                        }
                    </Grid>
                    <AddALink data={this.props.id} />
                </>
            );
    }
    
}
        
