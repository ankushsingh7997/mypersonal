const mongoose=require('mongoose')
const validator=require('validator')
const uuid=require('node-uuid')

const customerSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    mobileNumber:
    {
        type:String,
        minlength:10,
        max:10,
        unique:true
    },
    DOB:
    {
        type:Date,
        
    },
     email:
    {
        type:String,
        unique:true,


       
    },
    address:String,
    customerId:String
    ,
        status:
        {
            type:String,
            enum:["ACTIVE","INACTIVE"],
            default:"ACTIVE"
        }
        ,
        isDeleted:
        {
            type:Boolean,
            default:false
        }
},{timestamps:true})
module.exports=mongoose.model('customer',customerSchema)