
const mongoose = require("mongoose");

// Sub-schema for items in an order
const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  qty: { type: Number, default: 1 },
  price: { type: Number, required: true },
}, { _id: false });

// Main order schema
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  restaurantName: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String },
  items: [itemSchema],
  status: { type: String, enum: ["Pending", "Delivered", "Cancelled", "Preparing"], default: "Pending" },
}, { timestamps: true });

// Index to speed up queries
orderSchema.index({ customerId: 1, orderDate: -1 });

module.exports = mongoose.model("Order", orderSchema, "orders");


