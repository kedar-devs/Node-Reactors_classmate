const JobModel=require('./../model/Job.model')
exports.AddJobs=async(req,res)=>{
    try{
    const {Role,Jobtype,jobTitle,Skills,description,duration,stipend,companyId,vacancies}=req.body
    const newJob={
        Role:Role,
        Jobtype:Jobtype,
        jobTitle:jobTitle,
        Skills:Skills,
        description:description,
        duration:duration,
        stipend:stipend,
        creationDate:new Date(),
        companyId:companyId,
        vacancies:vacancies
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

exports.DeleteJob=async(req,res)=>{
    try{
    const {id}=req.params
    const FoundJob=await JobModel.findOneAndDelete({_id:id})
    if(FoundJob){
        return res.status(200).send({message:'The Job was Deleted successfully'})
    }
    else{
        return res.status(404).send({message:'No User was found'})
    }
}catch(err){
    console.log(err)
    return res.status(400).send({message:err})
}
}

exports.getJob=async(req,res)=>{
    try{
    const FoundJob=await JobModel.find()
    if(FoundJob){
        return res.status(200).send({FoundJob})
    }
    else{
        return res.status(404).send({message:"No Job Found"})
    }
}catch(err){
    console.log(err)
    return res.status(400).send({message:err})
}
}

exports.updateVacancies=async(req,res)=>{
    try{
    const {id}=req.params
    const FoundJob=await JobModel.findOne({_id:id})
    FoundJob.vacancies-=1
    FoundJob.save((err,user)=>{
        if(err){
            return res.status(400).send({message:err})
        }
        else{
            return res.status(200).send({message:"Vacancy updated Succesfully"})
        }
    })
}catch(err){
    console.log(err)
    return res.status(400).send({message:err})
}
}
