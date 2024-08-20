const Usermodel=require("../models/usermodel");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const usermodel = require("../models/usermodel");
// user registration controller
const registration_controller=async(req,res)=>{
    try{
           const {username,email,password,phone}=req.body;
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
            username,email,password:hashpassword,phone
           });
           createuser.save();
           res.status(200).send({success:true,message:"Registration Successful!"});
    }catch(err){
        console.log(err+"=> registration")
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
            const token=jwt.sign({id:findemail._id},"ksjdsjd",{
                expiresIn:"30d"
            })
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
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) return res.status(400).json({ status: false, message: "Access Denied" })

    jwt.verify(token,process.env.JWT_SECRET_CODE , async (err, decode) => {
        const user = await usermodel.findById(decode?.id)
        if(!user) return  res.status(400).json({ status: false, message: "Invalid Token"})
        const userData = {
            id: user?.id,
            username: user?.username,
            email: user?.email
        }
        return res.status(201).json({ status: true, message: "Profile Data", data: userData })
    })

}

module.exports={registration_controller,signin_controller,logoutcontroller,getusercontroller}