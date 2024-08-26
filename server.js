const express=require("express");
const server=express();
const cors=require("cors");
const bodyparser=require("body-parser")
const Port=process.env.PORT || 8000;
const databse=require("./config/database");
const router=require("./routes/userRoute");
const admin_route = require("./routes/adminRoute");
const cookieParser = require('cookie-parser');
const session=require("express-session")
require("dotenv").config();

server.use(express.json());
server.use(express.static("public"))
server.use(session({secret: 'keyboard cat',}))
server.use(cookieParser())
server.use(cors({
    origin:true,
    methods:[ "GET","POST","PUT","DELETE"],
    credentials:true
  }));
server.use(router)
server.use(admin_route)
databse();
server.get("/",(req,res)=>{
    req.session.usename="Shihab";
});
server.get("/me",(req,res)=>{
    console.log(req.session.usename)
    res.send("he")
});
server.listen(Port,function(){
    console.log(`Server is running on ${Port}`)
})