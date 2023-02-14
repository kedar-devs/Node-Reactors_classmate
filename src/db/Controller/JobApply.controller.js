const JobApplyModel=require('./../model/JobApply.model')
exports.ApplyJob=async(req,res)=>{
    try{
    const {jobId,StudentId}=req.body
    const newApply={
        jobId:jobId,
        StudentId:StudentId,
        status:'Applied',
        applyDate:new Date()
    }
    const newApplies=new JobApplyModel(newApply)
    newApplies.save((err,user)=>{
        if(err){
            return res.status(400).send({message:err})
        }
        else{
            return res.status(200).send({message:'Job Applied succesfully'})
        }
    })
}catch(err){
    console.log(err)
    return res.status(400).send({message:err})
}
}

exports.changeStatus=async(req,res)=>{
    try{
    const {id,status}=req.body
    const FoundJob=await JobApplyModel.findOne({_id:id})
    FoundJob.status=status
    FoundJob.save((err,user)=>{
        if(err){
            return res.status(400).send({message:err})
        }
        else{
            return res.status(200).send({message:'Job Applied succesfully'})
        }
    })
}catch(err){
    console.log(err)
    return res.status(400).send({message:err})
}
}

exports.DeleteApplies=async(req,res)=>{
    try{
    const {id}=req.params
    const FoundJob=await JobApplyModel.findOneAndDelete({_id:id})
    if(FoundJob){
        return res.status(200).send({message:'The Job application was Deleted successfully'})
    }
}catch(err){
    console.log(err)
    return res.status(400).send({message:err})
}
}

exports.checkApplies=async(req,res)=>{
    try{

        const {jobId,StudentId}=req.body
        const FoundJob=await JobApplyModel.findOne({jobId,StudentId})
        if(FoundJob){
            return res.status(200).send(true)
        }
        else{
            return res.status(400).send(false)
        }
    }catch(err){
    console.log(err)
    return res.status(400).send(false)
}
}
exports.getUserJobApplied=async(req,res)=>{
    try{
    const {StudentId}=req.body
    const FoundJob=await JobApplyModel.find({StudentId})
    if(FoundJob){
        return res.status(200).send({FoundJob})
    }
    else{
        return res.status(200).send({message:'No job Applied found'})

    }
}catch(err){
    console.log(err)
    return res.status(400).send(false)
}
}