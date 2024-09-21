const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    account_type:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        default:0
    },
    selle_status:{
         type:Number,
         default:0
    },
    is_admin:{
        type:Number,
        default:0,
    }
},{timestamps:true});

const usermodel=mongoose.model("User",userschema);

module.exports=usermodel;