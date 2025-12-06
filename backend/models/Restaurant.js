const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("Restaurant", restaurantSchema, "restaurants");

