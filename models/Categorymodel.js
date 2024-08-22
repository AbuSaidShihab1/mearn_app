const mongoose=require("mongoose");

const Categoryschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        maxLength:50
    },
    photo:{
        type:String,
        required:true
    }
});

const Categorymodel=mongoose.model("Category",Categoryschema);

module.exports=Categorymodel;