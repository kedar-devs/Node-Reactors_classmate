const mongoose = require("mongoose");
require('dotenv').config()
const uri=process.env.MONGODB_URL
exports.ConnectDB=()=>{
	try {
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	dbName:'classMate'
});

const connection=mongoose.connection
return connection.once('open',()=>{
    console.log('connection established successfully')
})
}catch(err){
	console.log(err)
    return false
}
}
