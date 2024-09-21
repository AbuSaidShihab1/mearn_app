const mongoose=require("mongoose");

const flashproductschema=new mongoose.Schema({
    photo:[],
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
   approve:{
    type:Number,
    default:0
   },
   ending_time:{
    type:String,
    required:true
   }
   
},{timestamps:true});

const flashproductmodel=mongoose.model("Flash_sell",flashproductschema);

module.exports=flashproductmodel;