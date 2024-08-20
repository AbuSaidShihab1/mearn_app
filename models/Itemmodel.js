const mongoose=require("mongoose");

const Itemschema=new mongoose.Schema({
    id:String,
    name:String,
    price:Number,
    totalprice:Number,
    quantity:Number,
    image:String,
    rating:Number,
    userid:String
},{timestamps:true});

const Itemmodel=mongoose.model("Item",Itemschema)