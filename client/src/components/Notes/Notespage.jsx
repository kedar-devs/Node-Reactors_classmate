import React, { Component } from 'react'
import axios from "axios"
import { Grid } from '@material-ui/core';
import NotesCard from "../Notes/NoteCard"
import Addnote from "./Addnote"
export default class Notespage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[]
        }
    }
    componentDidMount() {
        axios.get("http://localhost:5000/classwork/GetNotes/" + this.props.id)
            .then(res => {
                let k=[]
                console.log(res.data[0]);
                for (let i = 1; i < res.data[0].length; i++) {
                    console.log(res.data[0][i]);
                    k.push(res.data[0][i])
                }
                console.log(k);
                this.setState({ data: k })
                
            }).catch(err => {
                console.log("There is error here in retriving the notes");
                console.log(err);
            });
    }
    render() {
        return (
            <>
            <Grid container justify="center" alignItems="center">
                {
                    this.state.data.map((e, i) =>
                        <Grid item container md={3} sm={6} xs={12} >
                            <NotesCard data={e} />
                            </Grid>
                    )
                }
                </Grid>
                <Addnote id={this.props.id} />

                </>
        )
    }
}
