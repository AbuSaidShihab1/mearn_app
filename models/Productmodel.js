const mongoose=require("mongoose");

const productschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    sub_title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
},{timestamps:true});

const productmodel=mongoose.model("Product",productschema);

module.exports=productmodel;