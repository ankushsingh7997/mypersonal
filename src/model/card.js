const mongoose=require('mongoose')

const cardSchema=mongoose.Schema({
cardNumber:String,
    cardType:{
        type:String,
        enum:["REGULAR","SPECIAL"],
        default:"REGULAR"
    },
    customerName:{
    type:String,
    required:true},
    status:{
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"ACTIVE"
    },
    vision:String,
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"customer",
        required:true
    },
    isDeleted:
    {
        type:Boolean,
        default:false
    }

},{timestamps:true})

module.exports=mongoose.model('card',cardSchema)
