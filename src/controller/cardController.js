const cardModel=require('../model/card.js')


const create=async function(req,res)
{
     try{
     let data=req.body;
   
     const dataresult=await cardModel.create(data)
    
     return res.status(200).send({result:dataresult})
     }
     catch(error)
     {
          return res.status(500).send({status:false,message:error.message})

     }
     
}

const getCard=async function(req,res)
{
     try{
   
     const dataresult=await cardModel.find()
    
    return res.status(200).send({result:dataresult})
     }
     catch(error)
     {
          return res.status(500).send({status:false,message:error.message})
     }
     
}


module.exports={create,getCard}