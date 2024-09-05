const Usermodel=require("../models/usermodel");
const bcrypt=require("bcryptjs")
const JWT=require("jsonwebtoken");
const usermodel = require("../models/usermodel");

// user registration controller
const registration_controller=async(req,res)=>{
    try{
           const {username,email,password,phone,account_type}=req.body;
           console.log(username,email,password,phone,account_type)
           if(!username || !email || !password || !phone){
           return  res.send({success:false,message:"Please fill up your information!"})
           };
           const findemail_formatch=await Usermodel.findOne({email:email});
           if(findemail_formatch){
            return res.send({
                success:false,
                message:"Email already exist!"
            })
           };
           const hashsalt=await bcrypt.genSalt(10);
           const hashpassword=await bcrypt.hash(password,hashsalt)
           const createuser=new Usermodel({
            username,email,password:hashpassword,phone,account_type
           });
           createuser.save();
           res.status(200).send({success:true,message:"Registration Successful!"});
    }catch(err){
        console.log(err+"=> registration");
    }
};
// user sign in controller
const signin_controller=async(req,res)=>{
    try{
         const {email,password}=req.body;
         if(!email || !password){
            return res.send({success:false,message:"Invalid Email or Password!"})
         }
         const findemail=await Usermodel.findOne({email:email});
         if(!findemail){
            return res.send({success:false,message:"Email or Password did not match!"})
         }
         const comparepasssword=await bcrypt.compare(password,findemail.password);
         if(!comparepasssword){
           return res.send({success:false,message:"Email or Password did not match!"})
         };

        //  if password match
        if(comparepasssword){
            const token = JWT.sign({userId:findemail._id},"!@#$%^&*()",{
                expiresIn:'365d'
              });
              res.cookie("token",token, {
                expiresIn: new Date(Date.now() + 1000 * 30),
                httpOnly: true,
                sameSite: "lax",
              });
            res.status(200).send({
                success:true,
                message:"Login Successful!",
                user:findemail,
                token
             });
        }
     
    }catch(err){
        console.log(err)
    }
}
// logout controller
const logoutcontroller=(req,res)=>{
    try {
         res.clearCookie("user_info").json({success:true,message:"Logout Successful!"});
    } catch (error) {
        console.log(error)
    }
}
// get user
const getusercontroller=async(req,res)=>{
   try{
    res.json({user:req.user})
   }catch(err){
    console.log(err)
   }

}

module.exports={registration_controller,signin_controller,logoutcontroller,getusercontroller}