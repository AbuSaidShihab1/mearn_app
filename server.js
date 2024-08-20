const express=require("express");
const server=express();
const cors=require("cors");
const bodyparser=require("body-parser")
const Port=process.env.PORT || 8000;
const databse=require("./config/database");
const router=require("./routes/userRoute")
require("dotenv").config();

server.use(express.json());
server.use(cors());
server.use(router)
databse();
server.get("/",(req,res)=>{
    res.send("hello shihab");
});

server.listen(Port,function(){
    console.log(`Server is running on ${Port}`)
})