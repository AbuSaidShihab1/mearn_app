const mongoose=require("mongoose");

const Brandschema=new mongoose.Schema({
    photo:{
        type:String,
        required:true
    },
    brand_name:{
        type:String,
        required:true,
    },
    brand_type:{
        type:String
    }
},{timestamps:true});

const Brandmodel=mongoose.model("Brand",Brandschema);

module.exports=Brandmodel;