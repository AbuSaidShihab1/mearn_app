const mongoose=require("mongoose");

const cartschema=new mongoose.Schema({
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    photo:
    {
        type:Array
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productprice:{
        type:Number,
        required:true
    }
},{timestamps:true});



const cartitemschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[cartschema]
});

const cartmodel=mongoose.model("Cart",cartitemschema);

module.exports=cartmodel;
