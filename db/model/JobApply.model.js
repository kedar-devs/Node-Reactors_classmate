const { ObjectId } = require('mongoose')
const mongoose=require('mongoose')

const Schema=mongoose.Schema
const JobApplySchema=new Schema({
    jobId:{type:ObjectId,required:true},
    StudentId:{type:ObjectId,required:true},
    applyDate:{type:Date,required:true},
    status:{type:String,required:true}
})
const JobApplyModel=mongoose.model('JobApply',JobApplySchema)
module.exports=JobApplyModel