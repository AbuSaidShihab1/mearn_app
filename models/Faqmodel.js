const mongoose=require("mongoose");

const Faqschema=new mongoose.Schema({
    category_name:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    answere:{
        type:String,
        required:true
    },
});

const FAQmodel=mongoose.model("FAQ",Faqschema);

module.exports=FAQmodel;