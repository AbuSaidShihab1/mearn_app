const mongoose=require("mongoose");

const Subcategoryschema=new mongoose.Schema({
    maincategory:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    }
});

const Subcategorymodel=mongoose.model("Subcategory",Subcategoryschema);
module.exports=Subcategorymodel;