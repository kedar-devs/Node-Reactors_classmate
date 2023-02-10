const mongoose=require('mongoose')

const Schema=mongoose.Schema

const RecruitorSchema=new Schema({
    firstname:{
          type:String,
        required:true,
        trim:true,
        minlength:2
    },
    lastname:{
     type:String,
     required:false,
     trim:true,
     minlength:1   
    },
    CompanyName:{
        type:String,
        required:false,
        trim:true,
        minlength:1   
       },
    CompanyLoc:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    numberemp:{
        type:Number,
        required:true
    },
    description:{type:String,required:true},
    type:{type:String,required:true},
    tag:{type:String,required:true},
    resetToken:{type:String,required:true},
    expiresToken:{type:String,required:true}
    
})

const recruitor=mongoose.model('recruitor',RecruitorSchema);

module.exports=recruitor