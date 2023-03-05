
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const JobSchema=new Schema({
    Role:{type:String,required:true},
    Jobtype:{type:String,required:true},
    jobTitle:{type:String,required:true},
    Skills:{type:[String],required:true},
    description:{type:[String],required:true},
    duration:{type:String,required:true},
    stipend:{type:Number,required:true},
    creationDate:{type:Date,required:true},
    companyId:{type:mongoose.ObjectId,required:true},
    vacancies:{type:Number,required:true}
})
const JobModel=mongoose.model('Jobs',JobSchema)
module.exports=JobModel