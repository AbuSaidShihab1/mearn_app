const express=require("express");
const Productmodel = require("../models/Productmodel");
const admin_route=express.Router();
const multer=require("multer");
const Categorymodel = require("../models/Categorymodel");
// photo add
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"../client/src/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});
// category photo add
const categorystorage2=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"../client/src/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadcategoryimage=multer({storage:categorystorage2});
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
})

module.exports=admin_route;