const express=require('express');
var bodyParser=require('body-parser')
const route=require('../src/routes/route.js')
const{default:mongoose}=require('mongoose')
const app=express();
mongoose.connect("mongodb+srv://Vishanksingh:7997@cluster0.ga4iiwd.mongodb.net/Ankush1234-DB?retryWrites=true&w=majority",
{useNewUrlParser:true})
.then(()=>{console.log("connected to mongodb")})
.catch(err=>{console.log(err)})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/',route);

app.listen(3000,()=>{
    console.log("Express is running on port 3000")
});
