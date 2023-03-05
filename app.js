const express = require("express");
const cors=require('cors')
const path=require('path')
const StudentRoute = require("./db/routes/Student.route")
const ClassworkRoute = require("./db/routes/Classwork.route")
const RecruitorRoute = require("./db/routes/Recruitor.route")
const Bankhata=require("./db/routes/Bank.route")
const JobRoute=require('./db/routes/Job.route')
const fileUpload=require('express-fileupload')

const app = express();

app.use(cors())
app.use(express.json());
app.use(fileUpload());
app.use('/student',StudentRoute)
app.use('/recruitor',RecruitorRoute)
app.use('/classwork',ClassworkRoute)
app.use('/finance',Bankhata)
app.use('/job',JobRoute)

app.use(express.static(path.join(__dirname,"./client/build")))
app.get("*",function(_,res){
    res.sendFile(
        path.join(__dirname,"./client/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

module.exports = app;
