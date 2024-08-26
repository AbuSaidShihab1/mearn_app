const mongoose=require("mongoose");

const Addressschema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
      fullName: { type: String, require: true },
      address: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      country: { type: String, require: true },
      Zipcode: { type: String, require: true }, 
      phoneNumber: { type: String, require: true },
      createdAt: { type: Date, default: Date.now },
});

const Addressmodel=mongoose.model("Address",Addressschema);
module.exports=Addressmodel;