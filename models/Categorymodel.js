const mongoose=require("mongoose");

const Categoryschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        maxLength:50
    }
});

const Categorymodel=mongoose.model("Category",Categoryschema);

export default Categorymodel;