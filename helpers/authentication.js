const jwt=require("jsonwebtoken")
require("dotenv").config()

exports.authenticator=async(req,res,next)=>{
    try {
const token=req.headers.authorization && req.headers.authorization.split(" ")[1] 
 if(!token){
    return res.status(400).json("Something went wrong")
 }   

 await jwt.verify(token,process.env.jwtSecret,(err,tega)=>{
    if(err){
        return res.status(400).json(" kindly login to perform this action")
    }
      req.user=tega.firstName
    

 })
 next()

    } catch (error) {
       res.status(500).json(error.message) 
    }
}  