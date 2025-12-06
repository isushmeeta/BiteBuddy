// backend/models/Menu.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
});

const menuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  items: [menuItemSchema],
});

export default mongoose.model("Menu", menuSchema);
