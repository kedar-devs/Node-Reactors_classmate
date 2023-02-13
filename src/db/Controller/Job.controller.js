const JobModel=require('./../model/Job.model')
exports.AddJobs=async(req,res)=>{
    try{
    const {Role,Jobtype,jobTitle,Skills,description,duration,stipend}=req.body
    const newJob={
        Role:Role,
        Jobtype:Jobtype,
        jobTitle:jobTitle,
        Skills:Skills,
        description:description,
        duration:duration,
        stipend:stipend,
        creationDate:new Date()
    }
    const Job=new JobModel(newJob)
    Job.save((err,user)=>{
        if(err){
            return res.status(400).send({message:err})
        }
        else{
            return res.status(200).send({message:'Job Added Sucessfully'})
        }
    })
}catch(err){
    console.log(err)
    return res.status(400).send({message:err})
}
}