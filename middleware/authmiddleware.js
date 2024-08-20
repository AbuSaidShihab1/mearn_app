const JWT=require("jsonwebtoken");
const usermodel = require("../models/usermodel");

// login middleware
const authmiddleware=async(req,res,next)=>{

  try{
    const auth = req.headers['authorization'];
    const decoded= JWT.verify(auth,process.env.JWT_SECRET_CODE)
     req.user=decoded;
     next();
     console.log(decoded)
  }catch(err){
    console.log(err);
    res.send({success:false})
  }
};
// admin check middleware
const isadmin=async(req,res,next)=>{
    try {
        const user=await usermodel.findById(req,user.id);
        if(user.role !==1){
            return res.status(400).send({
                success:false,
                message:"Invalid email or password!"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports={authmiddleware,isadmin}