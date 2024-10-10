const Contactmodel = require("../models/Contactmodel");
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

// -------------contact controlelr----------
const admincontactcontroller=async(req,res)=>{
  try {
      const contact_data=await Contactmodel.find();
      console.log(contact_data)
      res.send({contact_data})
  } catch (error) {
      console.log(error)
  }
};
module.exports={subcategorycontroller,admincontactcontroller}