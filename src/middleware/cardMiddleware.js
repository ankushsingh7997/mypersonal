const cardModel=require('../model/card.js')
const customerModel=require('../model/customer')
const validator=require('validator')
const operations=async (req,res,next)=>{
    try{

if(!req.body.customerName||req.body.customerName.trim=="") return res.status(400).send({status:false,message:"customer name is required"})


if(req.body.cardType)
{
    req.body.cardType=req.body.cardType.toUpperCase()
    let flag=false
    if(req.body.cardType=="REGULAR"||req.body.cardType=="SPECIAL")
    {
            flag=true
    }
    if(!flag) return res.status(400).send({status:false,message:"cardType could be REGULAR or SPECIAL only"})
}

if(req.body.status)
{
    req.body.status=req.body.status.toUpperCase()

    let flag=false
    if(req.body.status=="ACTIVE"||req.body.status=="INACTIVE")
    {
            flag=true
    }
    if(!flag) return res.status(400).send({status:false,message:"status could be ACTIVE or INACTIVE only"})

}
if(!req.body.customerId||req.body.customerId.trim()=="")   return res.status(400).send({status:false,message:"customer id is required"})

if(!validator.isMongoId(req.body.customerId))   return res.status(400).send({status:false,message:"Invalid Id"})

if(req.body.vision)
{
    req.body.vision=req.body.vision.trim()
    if(typeof req.body.vision!=  'string')  return res.status(400).send({status:false,message:"only string allowed in vision"})
}






//check customer id in database of customer and card
// if customer id is present in customer schema then take entry
// if customer id is already present in card database dont take entry for 

// check on customer schema
let checkcustomer=await customerModel.findOne({_id:req.body.customerId})
if(!checkcustomer) return res.status(404).send({statsu:false,message:"No customer found please check customer Id"})




let customername=req.body.customerName.trim().split(" ");  //   ankush     singh  
let firstnameFromCard=customername[0];
let lastnameFromCarde=customername[customername.length-1];



    let customerFirstName=checkcustomer.firstName;
    let customerLastName=checkcustomer.lastName;

    if(firstnameFromCard.toUpperCase()!==customerFirstName.toUpperCase()||lastnameFromCarde.toUpperCase()!==customerLastName.toUpperCase()) return res.status(400).send({result:"Name does not match with customer id name"})
    



let checkOncard=await cardModel.findOne({customerId:req.body.customerId})

if(checkOncard) return res.status(400).send({result:"This customerId is already present "})


  req.body.customerName=customerFirstName+" "+customerLastName;


let checkOnDatabase=await cardModel.find();
if(checkOnDatabase.length===0)
{
   req.body.cardNumber="c-1"
   
}
else
{
   
    let custId=checkOnDatabase[checkOnDatabase.length-1].cardNumber.split('');
    // console.log(custId)
    let custid2="";
    for(let i=2;i<custId.length;i++)
    {
        custid2+=custId[i];
    }
    let finalCustomerId=Number(custid2)+1
    finalCustomerId="C-"+String(finalCustomerId);
    // console.log(finalCustomerId)
    req.body.cardNumber=finalCustomerId

    


}
next();
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }


}




module.exports={operations}