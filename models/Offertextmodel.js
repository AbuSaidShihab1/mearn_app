const mongoose=require("mongoose");

const Offertextschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
});
const Offertextmodel=mongoose.model("Offer_text",Offertextschema);

module.exports=Offertextmodel;