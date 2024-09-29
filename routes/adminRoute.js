const express=require("express");
const Productmodel = require("../models/Productmodel");
const admin_route=express.Router();
const multer=require("multer");
const Categorymodel = require("../models/Categorymodel");
const Trendingmodel = require("../models/Trendingmodel");
const Ordermodel = require("../models/Ordermodel");
const subcategorycontroller=require("../models/Subcategorymodel")
const Subcategorymodel=require("../models/Subcategorymodel");
const Subsubcategorymodel = require("../models/Subsubcategory");
const usermodel = require("../models/usermodel");
const productmodel = require("../models/Productmodel");
const uploadfile=require("../helper/upload");
const Blogmodel = require("../models/Blogmodel");
const flashproductmodel = require("../models/Flashsell");
const Brandmodel = require("../models/Brandmodel");
const Socialmodel = require("../models/Socialmodel");
const Offertextmodel = require("../models/Offertextmodel");
// photo add
admin_route.use(express.static("public"))
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});
// category photo add

admin_route.post("/product-add",uploadimage.array("photo"),async(req,res)=>{
              try{
                console.log("hello")
                    const {title,description,tags,sizes,category,subcategory,
                        subsubcategory,price,old_price,discount,brand,approve,
                        trending_product,new_arrival,sub_title,user_id,
                        stock,productqyt}=req.body;
                        console.log(req.files)
                        const uploadedImages = req.files.map((file) => file.filename);
                        const productadd=new Productmodel({
                        photo:uploadedImages,
                        title,description,tags,sizes,main_category:category,sub_category:subcategory,
                        sub_sub_category:subsubcategory,sub_title:"hot",price,old_price,discount,brand,
                        trending_product,new_arrival,user_id,approve,
                        stock,productqyt
                    });
                    productadd.save();
              }catch(err){
                console.log(err)
              }
});
// flash sell product add
admin_route.post("/flash-product-add",uploadimage.array("photo"),async(req,res)=>{
    try{
      console.log("hello")
          const {title,description,tags,sizes,category,subcategory,
              subsubcategory,price,old_price,discount,brand,ending_time,sub_title,
              stock,productqyt}=req.body;
              const uploadedImages = req.files.map((file) => file.filename)
              console.log(uploadedImages)
          const productadd=new flashproductmodel({
              photo:uploadedImages,
              title,description,tags,sizes,main_category:category,sub_category:subcategory,
              sub_sub_category:subsubcategory,sub_title,price,old_price,discount,brand,
              ending_time,stock,productqyt
          });
          productadd.save();
    }catch(err){
      console.log(err)
    }
});
admin_route.post("/add-category",uploadimage.single("file"),async(req,res)=>{
    try{
            const {name}=req.body;
            console.log(req.file)
            const categoryadd=new Categorymodel({
                name,
                photo:req.file.filename
            });
            categoryadd.save();;
            console.log(categoryadd)
    }catch(err){
        console.log(err)
    }
});
admin_route.get("/single-main-category/:id",async(req,res)=>{
    try {
        const maincategory=await Categorymodel.findOne({_id:req.params.id});
        res.send({category:maincategory})
         console.log(maincategory)
    } catch (error) {
        console.log(error)
    }
})
// order products
admin_route.get("/ordered-all-products",async(req,res)=>{
    try {
         const orderitem=await Ordermodel.find();
            res.status(200).send({success:true,message:"Ordered Items!",orders:orderitem})
    } catch (error) {
        console.log(error)
    }
})
// delete order
admin_route.delete("/admin-order-delete/:id",async(req,res)=>{
        try{
          const deleteproduct=await Ordermodel.findByIdAndDelete({_id:req.params.id});
        }catch(err){
            console.log(err)
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
});

admin_route.post("/add-sub-category",uploadimage.single("file"),async(req,res)=>{
    try {
         const {name,maincategory}=req.body;
         if(!maincategory || !name){
           return res.status(200).send({success:true,message:"Please fill the information!"});
         }

         const addsubcategory= new Subcategorymodel({
            maincategory,
            subcategory:name,
            photo:req.file.filename
         });
         if(addsubcategory){
            addsubcategory.save();
            console.log(addsubcategory)
            res.status(200).send({success:true,message:"ok",category:addsubcategory})
         }else{
            console.log("Something went wrong!")
         }
         console.log("Ok")

    } catch (error) {
        console.log(error)
    }
})
// sub sub category
admin_route.post("/add-sub-sub-category",uploadimage.single("file"),async(req,res)=>{
    try {
         const {name,maincategory,subcategory}=req.body;
         if(!maincategory || !name || !subcategory){
           return res.status(200).send({success:false,message:"Please fill the information!"});
         }
         const addsubcategory=new Subsubcategorymodel({
            maincategory,
            subcategory,
            subsubcategory:name,
            photo:req.file.filename
         });
         addsubcategory.save();
         console.log(addsubcategory)
    } catch (error) {
        console.log(error)
    }
});

// all customer
admin_route.get("/all-customers",async(req,res)=>{
    try {
        const customers=await usermodel.find();
        res.send({success:true,message:"Data get successfully!",customers:customers})
    } catch (error) {
        console.log(error)
    }
})
// product delete
admin_route.delete("/product-delete/:id",async(req
    ,res)=>{
    try {
         const deletedata=await productmodel.findByIdAndDelete({_id:req.params.id});
         res.status(200).send({success:true,message:"Product deleted!"});
    } catch (error) {
        console.log(error)
    }
});

// dashbaord data
admin_route.get("/dashboard-data",async(req,res)=>{
    try {
         const ordercount=await Ordermodel.find().countDocuments();
         const productcount=await Productmodel.find().countDocuments();
          const customercount=await usermodel.find().countDocuments();
          const categorycount=await Subsubcategorymodel.find().countDocuments();
          const flashsellcount=await Trendingmodel.find().countDocuments();
          const completed_orders=await Ordermodel.find({status:"Completed"});
          const processing_orders=await Ordermodel.find({status:"Processing"}).countDocuments();
          const Shipped_orders=await Ordermodel.find({status:"Shipped"}).countDocuments();
          const trending_product=await Productmodel.find({trending_product:"trending_product"}).countDocuments();
         res.send({
            ordercount:ordercount,
            productcount:productcount,
            customercount:customercount,
            categorycount,
            flashsellcount,
            completed_orders,
            trending_product,
            processing_orders,
            Shipped_orders,
         })
    } catch (error) {
        console.log(error)
    }
})
// all user 
admin_route.get("/all-customers",async(req,res)=>{
    try {
        const allcustomers=await usermodel.find();
        res.send({
            customers:allcustomers
        })
    } catch (error) {
        console.log(error)
    }
})
// single user data
admin_route.get("/single-user-data/:id",async(req,res)=>{
    try {
        const finduser=await usermodel.findOne({_id:req.params.id});
        res.send({user:finduser})
    } catch (error) {
        console.log(error)
    }
})
// delete user 
admin_route.delete("/delete-user/:id",async(req,res)=>{
    try {
        const finduser=await usermodel.findByIdAndDelete({_id:req.params.id});
    } catch (error) {
        console.log(error)
    }
})
// blog add
admin_route.post("/add-blog",uploadimage.single("file"),(req,res)=>{
    try {
          const {title,description}=req.body;
          console.log(title)

          const blogsave=new Blogmodel({
            photo:req.file.filename,
            title,description
          });

          if(!blogsave){
            console.log("Something went wrong!")
          }
                    blogsave.save();
                    res.send({success:true})
    } catch (error) {
        console.log(error)
    }
})
// blog data
admin_route.get("/admin-blog-data",async(req,res)=>{
    try {
        const blogdata=await Blogmodel.find();
        res.send({blogs:blogdata});
    } catch (error) {
        console.log(error)
    }
})
// product details for update
admin_route.get("/product-details/:id",async(req,res)=>{
    try {
         const find_product=await productmodel.findById({_id:req.params.id});
         res.send({product:find_product});
    } catch (error) {
        console.log(error)
    }
})
// create brand
admin_route.post("/add-new-brand",uploadimage.single("file"),(req,res)=>{
    try {
          const {brand_name,brand_type}=req.body;
          const addbrand=new Brandmodel({
            brand_name,
            photo:req.file.filename,
            brand_type
          });
          addbrand.save();
          res.send({success:true})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/all-brands",async(req,res)=>{
    try {
        const brands=await Brandmodel.find();
        res.send({brands});
    } catch (error) {
        console.log(error)
    }
})
// find admin
admin_route.get("/user-as-admin",async(req,res)=>{
    try {
        const admin=await usermodel.find({is_admin:1});
        res.send({admin});
    } catch (error) {
        console.log(error)
    }
})
// find seller profile
admin_route.get("/user-as-seller",async(req,res)=>{
    try {
        const seller=await usermodel.find({account_type:"seller",seller_status:1});
        res.send({seller});
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/seller-request",async(req,res)=>{
    try {
        const seller=await usermodel.find({account_type:"seller",seller_status:0});
        res.send({seller});
    } catch (error) {
        console.log(error)
    }
})
// seller request approve
admin_route.post("/seller-approval/:id",async(req,res)=>{
    try {
        const seller=await usermodel.findByIdAndUpdate({_id:req.params.id},{$set:{seller_status:1}});
    } catch (error) {
        console.log(error)
    }
})
// seller product without approval
admin_route.get("/seller-product-without-approval",async(req,res)=>{
    try {
        const products=await productmodel.find({approve:0});
        res.send({products});
    } catch (error) {
        console.log(error)
    }
})
// seller product approval
admin_route.post("/seller-product-approval/:id",async(req,res)=>{
    try {
        const product=await productmodel.findByIdAndUpdate({_id:req.params.id},{$set:{approve:1}});
    } catch (error) {
        console.log(error)
    }
});
// add social account
admin_route.post("/admin-add-social-account",async(req,res)=>{
    try {
        const {name,icon_name}=req.body;
        const social_account=new Socialmodel({
            name,icon_name
        });
        social_account.save();
        res.send({success:true})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/admin-social-account",async(req,res)=>{
    try {
        const social_account=await Socialmodel.find();
        res.send({social_account});
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/admin-social-account/:id",async(req,res)=>{
    try {
        const social_account=await Socialmodel.findByIdAndDelete({_id:req.params.id});
    } catch (error) {
        console.log(error)
    }
});
// offer text
admin_route.post("/admin-add-offer-text",async(req,res)=>{
    try {
        const {title}=req.body;
        const offertext=new Offertextmodel({
            title
        });
        offertext.save();
        res.send({success:true})
    } catch (error) {
        console.log(error)
    }
});
admin_route.get("/admin-offer-text",async(req,res)=>{
    try {
        const offer_text=await Offertextmodel.find();
        res.send({offer_text});
    } catch (error) {
        console.log(error)
    }
});
admin_route.delete("/admin-offer-text/:id",async(req,res)=>{
    try {
        const offer_text=await Offertextmodel.findByIdAndDelete({_id:req.params.id});
    } catch (error) {
        console.log(error)
    }
});
module.exports=admin_route;