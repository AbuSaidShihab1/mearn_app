const express=require("express");
const server=express();
const cors=require("cors");
const bodyparser=require("body-parser")
const Port=process.env.PORT || 8000;
const databse=require("./config/database");
const router=require("./routes/userRoute");
const admin_route = require("./routes/adminRoute");
require("dotenv").config();

server.use(express.json());
server.use(express.static("public"))
server.use(cors());
server.use(router)
server.use(admin_route)
databse();
server.get("/",(req,res)=>{
    res.send("hello shihab");
});

server.listen(Port,function(){
    console.log(`Server is running on ${Port}`)
})