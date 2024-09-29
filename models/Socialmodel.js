const mongoose=require("mongoose");

const Socialschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    icon_name:{
        type:String,
        required:true
    }
});

const Socialmodel=mongoose.model("Social_account",Socialschema);

module.exports=Socialmodel;