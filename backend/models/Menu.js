import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: String,
}, { _id: true });

const menuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true, unique: true },
  items: [menuItemSchema],
}, { timestamps: true });

export default mongoose.model("Menu", menuSchema);
