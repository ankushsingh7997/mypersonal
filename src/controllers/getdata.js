
const model=require('../models/cryptomodel')


const myapi=async (req,res)=>{
    try{
    
    
    let result= JSON.parse(req.mydata)
   let sortedArray=result.data.sort((i,j)=>{return i.changePercent24Hr-j.changePercent24Hr})
   
   
   
   let create=await model.create(sortedArray)
     await model.deleteMany({ _id: { $nin: create.map(i => i._id) } })
   

    

   return res.send({data:create})
    }
    catch(err)
    {return res.status(500).send({status:false,message:err.message})}
}
module.exports={myapi}