const mongoose = require("mongoose");
require('dotenv').config()
const uri=process.env.MONGODB_URL

mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	dbName:'classMate'
});

const connection=mongoose.connection
connection.once('open',()=>{
    console.log('connection established successfully')
})