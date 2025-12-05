//Cart.js 

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
