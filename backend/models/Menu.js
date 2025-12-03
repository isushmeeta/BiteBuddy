const mongoose = require("mongoose");

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

module.exports = mongoose.model("Menu", menuSchema);
