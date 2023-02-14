const JobController=require('./../Controller/Job.controller')
const JobApplyControlller=require('./../Controller/JobApply.controller')
const router=require('express').Router()
router.post('/Create',JobController.AddJobs)
router.delete('/Delete/:id',JobController.DeleteJob)
router.get('/Get',JobController.getJob)
router.put('/UpdateVacncies',JobController.updateVacancies)

router.post('/Apply',JobApplyControlller.ApplyJob)
router.delete('/DeleteApply/:id',JobApplyControlller.DeleteApplies)
router.put('/CheckApplies',JobApplyControlller.checkApplies)
router.put('/ChangeStatus',JobApplyControlller.changeStatus)
router.get('/getApplication',JobApplyControlller.getUserJobApplied)
module.exports=router