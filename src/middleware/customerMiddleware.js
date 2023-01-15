// validation for customer and create customer Id
//1. atleast first name should be present 2. mobile no should should be of 10 digit 3.valid Email  4 name formatting and check alphabets
const validator=require('validator')

const customerModel=require('../model/customer')

const validation=async(req,res,next)=>
{
    try{
    let data=req.body;
    if(data.firstName&&data.lastName&&data.mobileNumber&&data.email)
    {
        if(!validator.isAlpha(data.firstName.trim())||!validator.isAlpha(data.lastName.trim()))
        {
            return res.status(400).send({result:"invalid Name special characters not allowed"})
        }
        else{


        // format of number 
      if(data.mobileNumber.toString().split("").length===10)
      {
        let flag=false;
        if(data.mobileNumber.toString().charAt(0)=="6"||data.mobileNumber.toString().charAt(0)=="7"||data.mobileNumber.toString().charAt(0)=="8"||data.mobileNumber.toString().charAt(0)=="9") {
            flag=true
        }
        
         if(!flag) return res.status(400).send({result:"invalid Number"})
        if(!validator.isNumeric(data.mobileNumber.toString()))  return res.status(400).send({result:"invalid Number"})
        // check number on database
        let NumberVerification=await customerModel.findOne({mobileNumber:data.mobileNumber})

        if(!NumberVerification){

    data.email=data.email.trim()

        if(validator.isEmail(data.email))
        {
           
            ////////////////////////////////////////////////////////////////////////
            //check Email on database check

            
                let resultOfId=await customerModel.findOne({email:data.email})
                
//////////////////////////////////////////////////////////////////////


            if(!resultOfId)
            {
                //////////////////////////////////////////////////////
        
                    let emailId=data.email.split("");
                    let finaluid=""
                    for(let i=0;i<emailId.length;i++)
                    {
                         if(emailId[i]=="@")
                         {break;}
                         else{
                            finaluid+=emailId[i];
                         }
                    }
                    finaluid= "SK-"+finaluid;
                    // eg sk-ankush12
                    
                    
/////////////////////////////////////////////////////////////////////
                req.body.customerId=finaluid;
                // status check
                if(!data.status||data.status=="ACTIVE"||data.status=="INACTIVE")
                {
                    // formatting data
                     req.body.firstName=req.body.firstName.trim();
                     req.body.lastName=req.body.lastName.trim();
                     req.body.address=req.body.address.trim();
                     req.body.email=req.body.email.trim();

                    next();
                }
                else{
                   return res.status(404).send({result:"Status could be ACTIVE||INACTIVE only"})

                }
                
            }
            else
            {
               return res.status(400).send({result:"Email already exist"})
            }

             
        }
        else{
            return res.status(400).send({result:"Enter a valid Email"})

        }
    }
    else{

        return res.status(400).send({result:"Number already in use "})
    }
          
      }
      else{
        return res.status(400).send({result:"please enter 10 digit number only"})
      }
    } //////
    }
    else{
        return res.status(400).send({result:"firstname, mobilenumber ,email field should'nt be empty"})
    }
}
catch(err)
{
    return res.status(500).send({status:false,message:err.message})
}

    

}
module.exports={validation}