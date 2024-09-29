const express=require("express");
const productmodel = require("../models/Productmodel");
const seller_route=express();


seller_route.get("/seller-products/:id",async(req,res)=>{
    try {
           const seller_products=await productmodel.findOne({user_id:req.params.id});
           res.send({products:seller_products});
           console.log(seller_products)
    } catch (error) {
        console.log(error)
    }
})

module.exports=seller_route;