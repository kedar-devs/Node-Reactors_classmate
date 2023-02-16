const express = require("express");
const cors=require('cors')
const path=require('path')
const StudentRoute = require("./db/routes/Student.route")
const ClassworkRoute = require("./db/routes/Classwork.route")
const RecruitorRoute = require("./db/routes/Recruitor.route")
const Bankhata=require("./db/routes/Bank.route")
const JobRoute=require('./db/routes/Job.route')
const fileUpload=require('express-fileupload')
require("./db/mongoose");

const app = express();
app.use(cors())
app.use(express.json());
app.use(fileUpload());
app.use('/student',StudentRoute)
app.use('/recruitor',RecruitorRoute)
app.use('/classwork',ClassworkRoute)
app.use('/finance',Bankhata)
app.use('/job',JobRoute)

module.exports = app;
