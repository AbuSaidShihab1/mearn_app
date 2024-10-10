const mongoose=require("mongoose");

const Contactschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String
    }
},{timestamps:true});

const Contactmodel=mongoose.model("Contact",Contactschema);

module.exports=Contactmodel;
