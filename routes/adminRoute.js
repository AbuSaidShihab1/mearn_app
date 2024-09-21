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
var uploader = multer({
    storage:multer.diskStorage({})
});
var uploader2 = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"./public/images")
        },
        filename:function(req,file,cb){
            cb(null,`${Date.now()}_${file.originalname}`)
        }
    })
});
var uploader3 = multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"./public/images")
        },
        filename:function(req,file,cb){
            cb(null,`${Date.now()}_${file.originalname}`)
        }
    })
});
admin_route.post("/product-add",uploadimage.array("photo"),async(req,res)=>{
              try{
                console.log("hello")
                    const {title,description,tags,sizes,category,subcategory,
                        subsubcategory,price,old_price,discount,brand,
                        trending_product,new_arrival,sub_title,
                        stock,productqyt}=req.body;
                        console.log(req.files)
                        const uploadedImages = req.files.map((file) => file.filename);
                        const productadd=new Productmodel({
                        photo:uploadedImages,
                        title,description,tags,sizes,main_category:category,sub_category:subcategory,
                        sub_sub_category:subsubcategory,sub_title:"hot",price,old_price,discount,brand,
                        trending_product,new_arrival,
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

admin_route.post("/trending-product-add",uploader.single("file"),async(req,res)=>{
    try{
          const {title,description,category,sub_title,price,old_price,rating}=req.body;
          const upload = await uploadfile.uploadFile(req.file.path);
          const productadd=new Trendingmodel({
              title,description,
              photo:upload.secure_url,
              category,sub_title,price,old_price,rating
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
admin_route.delete("/product-delete/:id",async(req,res)=>{
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
         res.send({
            ordercount:ordercount,
            productcount:productcount,
            customercount:customercount,
            categorycount,
            flashsellcount
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
// blog add
admin_route.post("/add-blog",uploadimage.single("file"),(req,res)=>{
    try {
          const {title,description}=req.body;
          console.log(req.file)

        //   const blogsave=new Blogmodel({
        //     photo:req.files.filename,
        //     title,description
        //   });
        //   blogsave.save();
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

module.exports=admin_route;