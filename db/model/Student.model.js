const mongoose=require('mongoose')

const Schema=mongoose.Schema

const StudentSchema=new Schema({
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
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    resume:{type:String},
    resetToken:{type:String,required:true},
    expiresToken:{type:String,required:true}
    
})

const student=mongoose.model('student',StudentSchema);

module.exports=student
