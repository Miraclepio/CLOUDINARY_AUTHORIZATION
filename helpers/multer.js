const multer = require("multer");
const path = require('path');
const jwt=require('jsonwebtoken');
const userModel = require("../model/userModel");

// Define storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./media");
    },
   

       
        
        
    
    
     
        filename: function (req, file, cb) {
            // const token=req.headers.authorization.split(" ")[1]
            const authHeader = req.headers.authorization;
            let token;
    
            if (authHeader) {
                token = authHeader.split(' ')[1];
            }     
        // console.log(user)
            if(token){
                // const token=req.headers
                // console.log(token)
                const decodedToken = jwt.verify(token,process.env.jwtSecret);
                const user = decodedToken.firstName;
              
                console.log(user)
                const fileExtension = file.originalname.split('.').pop();
                console.log('b')
                cb(null, `${user}'s profile picture updated.${fileExtension}`); 
                console.log('c') 

               

            } else if(!token) { 
                const { firstName, lastName } = req.body;
            // const user={ firstName, lastName }
              
                console.log(firstName);   
                const fileExtension = file.originalname.split('.').pop();
                const filename = `${firstName} ${lastName}'s profile picture.${fileExtension}`; 
                req.userName = `${firstName} ${lastName}`; // Store user's name in req for later use
                cb(null, filename);

            } 
        }
    });
 
// Define file filter function
const uploader = multer({
    storage, 
    fileFilter: function(req, file, cb) {
        const extension = path.extname(file.originalname);
        console.log(extension); 
        if(extension === ".png" || extension === ".jpg" || extension === ".jpeg") { 
         return   cb(null, true);
        } else {
          return  cb(new Error("unsupported format"), false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 } // 5 MB limit
});

module.exports = { uploader }; 
 