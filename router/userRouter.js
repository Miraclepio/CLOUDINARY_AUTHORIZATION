const router=require("express").Router()

const {createUser,verifyEmail,newEmail, logIn, updateUser,makeAdmin}=require("../controller/userController")

const {authenticator}= require("../helpers/authentication")
const {authorization,authorizationSuper}=require("../helpers/authorization")
const{uploader} =require("../helpers/multer")

const{ updatePicture}=require('../controller/userController')

router.post("/createuser",uploader.single('profilePicture'), createUser)

router.get("/verify/:id/:token",verifyEmail)

router.get("/newemail/:id",newEmail)
router.patch("/updateUser/:id",authorization, updateUser)

router.put("/makeadmin/:id",authorizationSuper,makeAdmin)

router.post("/login",logIn)
router.put("/change",authenticator,uploader.single('profilePicture'),updatePicture)

 
router.get("/",authenticator,(req,res)=>{
    res.status(200).json(`Welcome to my api ${req.user}`)
}) 


module.exports=router 