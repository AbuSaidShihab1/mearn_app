const jwt =require("jsonwebtoken");
const user=require("../models/usermodel")

 const Authenticated = async (req, res, next) => {
  const token = req.cookies.token;
  // const token = cookies.split("=")[1];
  if (!token) return res.json({ message: "Login first" });

  const decoded = jwt.verify(token, "!@#$%^&*()");

  // const id = decoded.userId;
  //   req.user = id;
  console.log(token)
  // let user = await user.findById(id);

  // if (!user) return res.json({ message: "User not exist" });

  // req.user = user;
  next();

  // console.log(decoded)
};
module.exports={Authenticated}