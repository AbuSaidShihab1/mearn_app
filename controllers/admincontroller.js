const Subcategorymodel = require("../models/Subcategorymodel");

const subcategorycontroller=(req,res)=>{
    try {
         const {name,maincategory}=req.body;
         if(!maincategory || !subcategory){
           return res.status(200).send({success:true,message:"Please fill the information!"});
         }
         const addsubcategory=new Subcategorymodel({
            maincategory,subcategory:name,
            image:req.file.filename
         });
         addsubcategory.save();
    } catch (error) {
        console.log(error)
    }
};

module.exports={subcategorycontroller}