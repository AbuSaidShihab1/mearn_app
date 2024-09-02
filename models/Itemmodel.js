const mongoose=require("mongoose");

const Itemschema=new mongoose.Schema({
    id:String,
    title:String,
    price:Number,
    totalprice:Number,
    quantity:Number,
    photo:String,
    rating:String,
    userid:String
},{timestamps:true});

const Itemmodel=mongoose.model("Item",Itemschema);

module.exports=Itemmodel;