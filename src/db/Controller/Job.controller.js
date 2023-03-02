const JobModel=require('./../model/Job.model')
const RecruitorModel=require('./../model/Recruitor.model')
exports.AddJobs=async(req,res)=>{
    try{
        console.log(req.body)
        let companyId=req.params.id
    const {Role,Jobtype,jobTitle,Skills,description,duration,stipend,vacancies}=req.body
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
exports.getJobByCompany=async(req,res)=>{
    try{
        const FoundJob=await JobModel.find({companyId:req.params.id})
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

exports.getJobDetails=async(req,res)=>{
    try{
    const {id}=req.params
    const FoundJob=await JobModel.findOne({_id:id})
    if(FoundJob){
        const responseData={
            compName:'',
            location:'',
            role:FoundJob.Role,
            jobTitle:FoundJob.jobTitle,
            recrName:'',
            recEmail:'',
            numEmp:'',
            desc:FoundJob.description,
            jobType:FoundJob.Jobtype,
            skills:FoundJob.Skills[0]
        }

        const FoundCompany=await RecruitorModel.findOne({_id:FoundJob.companyId})
        if(FoundCompany){
            responseData.compName=FoundCompany.CompanyName
            responseData.location=FoundCompany.CompanyLoc
            responseData.numEmp=FoundCompany.numberemp
            responseData.recEmail=FoundCompany.email
            responseData.recName=FoundCompany.firstname+' '+FoundCompany.lastname
            return res.status(200).send(responseData)
        }
        else{
            return res.status(404).send({message:'No company found'})
        }
    }
    else{
        return res.status(400).send({message:'No job found'})
    }
}catch(err){
    return res.status(400).send({message:'Internal Server error'})
}
}