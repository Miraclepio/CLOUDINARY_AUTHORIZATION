const express=require("express")

require("dotenv").config()
const app=express()
app.use(express.json())

const router=require("./router/userRouter")
const multer=require('multer')
app.use("/api/v1/",router)

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
    
            return res.status(400).json(err.message);
        }
       else if(err) {return res.status(400).json({ error: err.message });
    }

next()
});

const url=process.env.mongodburl
const port=process.env.port

const mongoose=require("mongoose")   

mongoose.connect(url).then(()=>{  
    console.log("connection to database established")
  
}).catch((error)=>{
    console.log("unable to connect because "+error)  
})  
app.listen(port,()=>{console.log("my app is connected on port "+port)})    