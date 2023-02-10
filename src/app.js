const express = require("express");
const cors=require('cors')
const path=require('path')
const StudentRoute = require("./db/routes/Student.route")
const ClassworkRoute = require("./db/routes/Classwork.route")
const RecruitorRoute = require("./db/routes/Recruitor.route")
const Bankhata=require("./db/routes/Bank.route")
require("./db/mongoose");

const app = express();
app.use(cors())
app.use(express.json());
app.use('/Notes',express.static(path.join(__dirname+'/Notes')))
app.use('/student',StudentRoute)
app.use('/recruitor',RecruitorRoute)
app.use('/classwork',ClassworkRoute)
app.use('/finance',Bankhata)

module.exports = app;
