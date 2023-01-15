var request = require('request');

const myFunction=(req,res,next)=>{
    try{
    
var options = {
  'method': 'GET',
  'url': 'https://api.coincap.io/v2/assets',
  'headers': {Authorization:"Bearer 949f4a04-864e-4de0-9541-8b3b1163d8df"
  }
  
};

request(options, function (error, response) {
    
  if (error) throw new Error(error);
  req.mydata=response.body;
  
  
  next()
})}
catch(err){return res.status(500).send({status:false,message:err.message})}}

module.exports={myFunction}