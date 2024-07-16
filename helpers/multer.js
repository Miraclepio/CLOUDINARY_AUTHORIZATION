const multer = require("multer");
const createUser=require('../controller/userController')
const path=require('path')

// Define storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./media");
    },
    filename: function (req, file, cb) {
      
        const userName=req.body
        firstName=userName.firstName
        lastName=userName.lastName
        console.log(firstName)
        // const fileExtension1=file.originalname.split('.')
        const fileExtension=file.originalname.split('.')[1]
        const filename=`${firstName} ${lastName}'s profile picture.${fileExtension}`
       
        cb(null, filename);
        // console.log(req.user=file.userName)
        // console.log(req.user=userName)
        // console.log(`Uploaded file for user ${userName} with new filename: ${newFilename}`);

        console.log(filename)
        // console.log(fileExtension)
        // console.log(fileExtension1)
    }
});

// Define file filter function
// const fileFilter = function (req, file, cb) {
//     if (file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
//         return cb(new Error ("Only .jpg, .jpeg, and .png files are allowed"), false);
//     }
//     cb(null, true);
// };

const uploader=multer({storage,
    fileFilter:function(req,file,cb){
        const extension= path.extname( file.originalname )
console.log(extension)
        if(extension == ".png" ||  extension == ".jpg" || extension ==".mp4") {
            cb (null,true)
        }else{
            cb (new Error ("unsupported format"))
        }
    }, 
    limits:{fileSize:1024*1024*1024*1024}
    
})

// Create the uploader with storage, file filter, and size limit options
// const uploader = multer({
//     storage,
//     fileFilter,
//     limits: {
//         fileSize: 1024 * 1024 
//     }
// });


module.exports = {uploader};