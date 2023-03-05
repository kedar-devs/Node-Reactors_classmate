const app = require("./app");
const port = process.env.PORT || 5000;
const {ConnectDB}=require('./db/mongoose.js')
const connect= ConnectDB()
if(connect!=false){
app.listen(port, () => {
	console.log(`Server is up on port ${port} ...`);
})
}
