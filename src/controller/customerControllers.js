const customerModel=require('../model/customer.js')
const validator=require('validator')

const create=async function(req,res)
{
    try{
     let data=req.body;
   
     const dataresult=await customerModel.create(data)
    
    return res.status(201).send({result:dataresult})
    }
    catch(error)
    {return res.status(500).send({status:false,message:error.message})}
     
}
// active list

const getStatusActiveList=async function(req,res)
 {  
    try{
     let list=await customerModel.find({status:{$eq:"ACTIVE"},isDeleted:{$eq:false}})
     return res.status(200).send({result:list})
    }
    catch(error)
    {
        return res.status(500).send({status:false,message:error.message}) 
    }
    

}
const DeleteCustomer=async function(req,res)
{  
   try{
if(!req.query.id||req.query.id.trim()=="") return res.status(400).send({status:false,message:"Id cannot be empty"})
if(!validator.isMongoId(req.query.id))  return res.status(400).send({status:false,message:"Invalid Id"})
    let list=await customerModel.findOneAndUpdate({_id:req.query.id,isDeleted:false},{isDeleted:true},{new:true})
if(!list) return res.status(404).send({status:false,message:"customer with this id is already deleted"})

    // res.status(200).send({result:list})
    return res.status(200).send({status:true,messsage:"customer Deleted successfully"})
   }
   catch(error)
   {
    return res.status(500).send({status:false,message:error.message})
   }
   

}


module.exports={create,getStatusActiveList,DeleteCustomer}