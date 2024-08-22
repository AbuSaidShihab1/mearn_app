const express=require("express");
const route=express.Router();
const {registration_controller,signin_controller,getusercontroller}=require("../controllers/userController");
const { authmiddleware, isadmin } = require("../middleware/authmiddleware");
const Itemmodel = require("../models/Itemmodel");
const usermodel = require("../models/usermodel");
const productmodel = require("../models/Productmodel");


route.post("/registration",registration_controller);
route.post("/login",signin_controller);
route.get("/user",getusercontroller);
route.get("/admin-auth",authmiddleware,isadmin,(req,res)=>{
    res.status(200).send({ok:true});
});
// user add to cart
route.post("/add-to-cart",async(req,res)=>{
    try{
       const {id,title,price,totalprice,quantity,image,rating,userid}=req.body;
       const matchaproduct=await Itemmodel.findOne({id,userid:userid});
       if(matchaproduct){
               let updateitem=await Itemmodel.findOneAndUpdate({id,userid},{
                $set:{
                    quantity:matchaproduct.quantity + 1,
                    totalprice:matchaproduct.price * (matchaproduct.quantity + 1),
                }
               },{
                upsert:true,
                new:true
               });
            if(!updateitem){
                return res.status(400).send({
                    success:false,
                    message:"Something webt wrong"
                })
            };
            return res.status(200).send({
                success:true,
                message:"Something webt wrong"
            })
       };
       const add_to_cart=new Itemmodel({
        id,title,price,
        totalprice:price*quantity,
        quantity,image,rating,userid
       });
       add_to_cart.save();
       const finduser=await usermodel.findOneAndUpdate({_id:userid},{
        $push:{
            carts:add_to_cart._id 
        }
       });
       if(!finduser){
        return res.status(400).send({
            success:false,
            message:"Something went wrong"
        })
       };
       return res.status(200).send({
        success:true,
        message:"Product Added!"
    })
    }catch(err){
        console.log(err)
    }
});
// all product get
route.get("/all-products",async(req,res)=>{
    try{
          const getproducts=await productmodel.find();
          res.status(200).send({
            success:true,
            message:"Data sent succefully!",
            products:getproducts
          })
    }catch(err){
        console.log(err)
    }
});

route.get("/user-product/:id",async(req,res)=>{
    try{
        const findcart_item=await Itemmodel.find({userid:req.params.id});
         if(!findcart_item){
          return  res.status(400).send({
                success:false,
                message:"Something went wrong"
            });
         }
         return  res.status(200).send({
            success:true,
            message:"Data get succefully!",
            cart_item:findcart_item
        });
    }catch(err){
        console.log(err)
    }
})
// remove user cart item
route.delete("/delete-item/:id",async(req,res)=>{
    try{
        const remove_item=await Itemmodel.findByIdAndDelete({_id:req.params.id});
         if(!remove_item){
            return  res.status(200).send({
                success:false,
                message:"Something went wrong"
            });
         }
         return  res.status(200).send({
            success:true,
            message:"Remove Item succefully!",

        });
    }catch(err){
        console.log(err)
    }
});

// increment cart item quantity
route.put("/item-quantity-increment/:id",async(req,res)=>{
    try{ 
        const finditem=await Itemmodel.findOneAndUpdate({_id:req.params.id},{
            $set:{
                quantity:{ $add:["$quantity",1]},
                totalprice:{$multiply:["$price",{$add:["$quantity",1]}]}
            }
        },{
            upsert:true,
            new:true
        });
        if(!finditem){
            return  res.status(400).send({
                success:false,
                message:"Something went wrong"
            });
        };
        return  res.status(200).send({
            success:true,
            message:"Item quantity updated",
            cart_item:finditem
        });
    }catch(err){
        console.log(err)
    }
});

// iser item quantity increment
route.get("/item-decrement/:id",async(req,res)=>{
    try {
        const finditem=await Itemmodel.findByIdAndDelete({_id:req.params.id,quantity:{$gt:0}},{
            $set:{
                quantity:{$subtract:["$quantity",1]},
                totalprice:{$subtract:["$totalprice","$price"]}
            }
        },{
            upsert:true,
            new:true
        });
        if(!finditem){
            return  res.status(400).send({
                success:false,
                message:"Something went wrong"
            });   
        }
        return  res.status(200).send({
            success:true,
            message:"Item quantity updated",
            cart_item:finditem
        });
    } catch (error) {
        console.log(error)
    }
})
module.exports=route;