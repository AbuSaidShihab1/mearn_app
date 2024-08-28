const mongoose=require("mongoose");

const Orderschema=new mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    zipcode:{
        type:String,
        required:true,
    },
    products:[],
    price:{
        type:Number,
        required:true,
    },
    pament:{
        type:String,
    },
    status:{
        type:String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    }

},{timestamps:true});

const Ordermodel=mongoose.model("Order",Orderschema);

module.exports=Ordermodel;