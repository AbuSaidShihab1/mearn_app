const express=require("express");
const Productmodel = require("../models/Productmodel");
const admin_route=express.Router();
const multer=require("multer");
const Categorymodel = require("../models/Categorymodel");
const Trendingmodel = require("../models/Trendingmodel");
const Ordermodel = require("../models/Ordermodel");
// photo add
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const storage3=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});
// category photo add
const categorystorage2=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadcategoryimage=multer({storage:categorystorage2});
const trendingimageupload=multer({storage:storage3});

admin_route.post("/product-add",uploadimage.single("file"),(req,res)=>{
              try{
                    const {title,description,category,sub_title,price,old_price,rating}=req.body;
                    const productadd=new Productmodel({
                        title,description,
                        photo:req.file.filename,
                        category,sub_title,price,old_price,rating
                    });
                    productadd.save();
              }catch(err){
                console.log(err)
              }
});
admin_route.post("/trending-product-add",trendingimageupload.single("file"),(req,res)=>{
    try{
          const {title,description,category,sub_title,price,old_price,rating}=req.body;
          const productadd=new Trendingmodel({
              title,description,
              photo:req.file.filename,
              category,sub_title,price,old_price,rating
          });
          productadd.save();
    }catch(err){
      console.log(err)
    }
});
admin_route.post("/add-category",uploadcategoryimage.single("file"),(req,res)=>{
    try{
            const {name}=req.body;
            const categoryadd=new Categorymodel({
                name,
                photo:req.file.filename
            });
            categoryadd.save();
    }catch(err){
        console.log(err)
    }
});
// order products
admin_route.get("/ordered-all-products",async(req,res)=>{
    try {
         const orderitem=await Ordermodel.find();
            res.status(200).send({success:true,message:"Ordered Items!",orders:orderitem})
    } catch (error) {
        console.log(error)
    }
})
// order status change
admin_route.put("/update-order-status/:id",async(req,res)=>{
    try {
        const {status}=req.body;
        console.log(status)
        const updatestatus=await Ordermodel.findByIdAndUpdate({_id:req.params.id},{status},{new:true});
        res.status(200).send({success:true,message:"Status updated!",orders:updatestatus});
    } catch (error) {
        console.log(error)
    }
})
// order details
admin_route.get("/admin-order-details/:id",async(req,res)=>{
    try {
        const ordertetails=await Ordermodel.findOne({_id:req.params.id});
        res.status(200).send({success:true,message:"Status updated!",orders:ordertetails});
    } catch (error) {
        console.log(error)
    }
})

module.exports=admin_route;