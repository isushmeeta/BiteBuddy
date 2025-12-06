// backend/models/Order.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  qty: { type: Number, default: 1 },
  price: { type: Number, required: true },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  restaurantName: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  paymentMethod: String,
  items: [itemSchema],
  status: { type: String, enum: ["Pending", "Delivered", "Cancelled", "Preparing"], default: "Pending" },
}, { timestamps: true });

orderSchema.index({ customerId: 1, orderDate: -1 });

export default mongoose.model("Order", orderSchema, "orders");
