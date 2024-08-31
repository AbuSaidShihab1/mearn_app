const mongoose=require("mongoose");

const Subsubcategoryschema=new mongoose.Schema({
    maincategory:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    subsubcategory:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const Subsubcategorymodel=mongoose.model("Subsubcategory",Subsubcategoryschema);
module.exports=Subsubcategorymodel;