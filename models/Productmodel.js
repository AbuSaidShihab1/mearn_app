const mongoose=require("mongoose");

const productschema=new mongoose.Schema({
    photo:{
        type:Array
   },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:
       {
        type:Array,
       }
    ,
    sizes:{
        type:Array
    },
    main_category:{
        type:String,
        required:true
    },
    sub_category:{
        type:String,
        required:true
    },
    sub_sub_category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
   brand:{
    type:String,
    required:true
   },
   stock:{
    type:String,
    required:true
   },
   sub_title:{
    type:String,
   },
   productqyt:{
    type:Number,
    required:true
   },
   trending_product:{
    type:String,
   },
   new_arrival:{
    type:String
   },
   approve:{
    type:Number,
    default:0
   }
   
},{timestamps:true});

const productmodel=mongoose.model("Product",productschema);

module.exports=productmodel;