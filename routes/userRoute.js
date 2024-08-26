const express=require("express");
const route=express.Router();
const {registration_controller,signin_controller,getusercontroller}=require("../controllers/userController");
const { Authenticated } = require("../middleware/authmiddleware");
const Itemmodel = require("../models/Itemmodel");
const usermodel = require("../models/usermodel");
const productmodel = require("../models/Productmodel");
const cartmodel = require("../models/Cartmodel");


route.post("/registration",registration_controller);
route.post("/login",signin_controller);
route.get("/user",Authenticated,getusercontroller);
// add to cart functionality
route.post("/add-to-cart/:id",async(req,res)=>{
    try{
       const {id,title,price,quantity,image}=req.body;
       console.log(req.headers)
       const userid=req.params.id;
       console.log(userid)
     let findcart=await cartmodel.findOne({userid:userid});
     let productprice=price;
     if(!findcart){
        findcart= new cartmodel({userid,items:[]});
     }
     const matchcartindex=findcart.items.findIndex((item)=>item.productid.toString()===id);
     if(matchcartindex >-1){
           findcart.items[matchcartindex].quantity +=quantity;
           findcart.items[matchcartindex].price +=price*quantity;
     }else{
        findcart.items.push({productid:id,title,price,quantity,image,productprice,userid})
     }
     await findcart.save();;
     res.send({success:true,message:"Cart have added!",findcart})
    }catch(err){
        console.log(err)
    }
});
route.get("/user-cart/:id",async(req,res)=>{
    try {
        const userid=req.params.id;
        let cart_item=await cartmodel.findOne({userid});
        if(!cart_item){
            return res.status(400).send({success:false,message:"Something went wrong!"})
        };
        res.status(200).send({success:true,message:"successful!",cart_item});
    } catch (error) {
        console.log(error)
    }
})
route.delete("/remove-cart/:id",async(req,res)=>{
    try {
        const productid=req.params.id;
        const userid=req.query.userid;
        // console.log(req.query.userid)
        let cart_item=await cartmodel.findOne({userid});
      
        const updatedList = cart_item['items'].filter(habit=> {
            return !productid.includes(`${habit._id}`)
          })
        cart_item['items'] = updatedList;
        if(!cart_item){
            return res.status(400).send({success:false,message:"Something went wrong!"})
        };
        await cart_item.save();
        res.status(200).send({success:true,message:"successful!",cart_item});
    } catch (error) {
        console.log(error)
    }
})
// user add to cart
route.post("/add-to-car",async(req,res)=>{
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
route.get("/user-cart",async(req,res)=>{
    try{
      let findcart=await cartmodel.findOne({userid:req.params.id});
      if(!findcart){
        return res.json({success:false,message:"SOmehting went wrong"});
      }
      return res.json({success:true,message:"Data has adding....."});
    }catch(err){
        console.log(err)
    }
})
// increment cart quantity
route.post("/decrement-quantity/:id",async(req,res)=>{
    try{
        const { productid, quantity} = req.body;

        const userid = req.params.id;
      
        let cart = await cartmodel.findOne({ userid });

        if (!cart) {
          cart = new cartmodel({ userid, items: [] });
          // return res.json({messge:'Cart not find'})
        }
      
        const itemIndex = cart.items.findIndex(
          (item) => item.productid.toString() === productid
        );
        console.log(itemIndex)
        if (itemIndex > -1) {
          const item = cart.items[itemIndex]
      
          if(item.quantity > quantity){
              const pricePerUnit = item.price/item.quantity
      
              item.quantity -= quantity
              item.price -= pricePerUnit*quantity
          }else{
              cart.items.splice(itemIndex,1)
          }
      
        } else {
          return res.json({messge:'invalid product Id'})
        } 
      
        await cart.save();
        res.json({ message: "Items qty decreased", cart });
     }catch(err){
         console.log(err)
     }
})

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
route.get("/remove-cart-item/:id",async(req,res)=>{
     try{
        const matchusr=await cartmodel.findOne({userid:req.params.id});
      
        if(!matchusr){
            return  res.status(400).send({
                success:false,
                message:"Something went wrong"
            });
       cart.items= cart.items.filter((item)=>{item.productid.toString() !== productid});
       await matchusr.save();
       res.json({success:true,message:"Data rmeoved!",cart:matchusr})

    }
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