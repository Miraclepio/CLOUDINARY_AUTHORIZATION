    
    

const jwt=require("jsonwebtoken")
require("dotenv").config()
const userModel= require("../model/userModel")

exports.authorization=async(req,res,next)=>{
    try {
const token=req.headers.authorization && req.headers.authorization.split(" ")[1] 
 if(!token){
    return res.status(400).json("Something went wrong")
 }   

 await jwt.verify(token,process.env.jwtSecret,(err,user)=>{
    if(err){
        return res.status(400).json(" kindly login to perform this action")
    }
   
    req.user=user.firstName


 })

const checkUser= await userModel.findOne({firstName:req.user})

console.log(checkUser)
      if(checkUser.isAdmin==false || checkUser.isSuperAdmin ==false){
      return  res.status(401).json("you are not permitted to perform this action")
       
      }else{
        next()
      }





    } catch (error) {
     return  res.status(500).json(error.message) 
    }
}  


//superAdmin

exports.authorizationSuper=async(req,res,next)=>{
    try {
const token=req.headers.authorization && req.headers.authorization.split(" ")[1] 
 if(!token){
    return res.status(400).json("Something went wrong")
 }   

 await jwt.verify(token,process.env.jwtSecret,(err,user)=>{
    if(err){
        return res.status(400).json(" kindly login to perform this action")
    }
   
    req.user=user.firstName


 })

const checkUser= await userModel.findOne({firstName:req.user})

console.log(checkUser)
      if(checkUser.isSuperAdmin==false){
      return  res.status(401).json("you are not permitted to perform this action")
       
      }else{
        next()
      }





    } catch (error) {
     return  res.status(500).json(error.message) 
    }
}  