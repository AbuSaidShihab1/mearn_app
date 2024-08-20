const mongoose=require("mongoose");

const productschema=new mongoose.Schema({
    name:{
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
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    sub_title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    old_price:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
},{timestamps:true});

const productmodel=mongoose.model("Product",productschema);

export default productmodel;