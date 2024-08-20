const express=require("express");
const route=express.Router();
const {registration_controller,signin_controller,getusercontroller}=require("../controllers/userController");
const { authmiddleware, isadmin } = require("../middleware/authmiddleware");


route.post("/registration",registration_controller);
route.post("/login",signin_controller);
route.get("/user",getusercontroller);
route.get("/admin-auth",authmiddleware,isadmin,(req,res)=>{
    res.status(200).send({ok:true});
});
module.exports=route;