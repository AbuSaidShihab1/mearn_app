const mongoose=require("mongoose");

const Blogschema=new mongoose.Schema({
    photo:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true});

const Blogmodel=mongoose.model("Blog",Blogschema);

module.exports=Blogmodel;