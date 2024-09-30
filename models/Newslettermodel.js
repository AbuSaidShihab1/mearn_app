const mongoose=require("mongoose");

const Newsletterschema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
},{timestamps:true});

const Newslettermodel=mongoose.model("Newsletter_email",Newsletterschema);

module.exports=Newslettermodel;