const mongoose = require("mongoose");

const uri = "mongodb+srv://sadia:BITEBUDDY471@bitebuddy.27ctm3y.mongodb.net/Bitebuddy?authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB Error:", err));
