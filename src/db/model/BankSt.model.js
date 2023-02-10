const mongoose =require('mongoose')
const Schema=mongoose.Schema
const KhataBooK=Schema({
    reasons: {type:String,required:true},
    Amount:{type:Number,required:true},
    date:{type:Date,required:true}
})
const BankSchema=Schema({
    userid:{type:String,required:true},
    record:[KhataBooK],
    totalexpenses:{type:Number,required:true},
    useremail:{type:String,required:true}
})
const bank=mongoose.model('Bank',BankSchema)
module.exports=bank