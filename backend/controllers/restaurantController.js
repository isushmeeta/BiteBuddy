const Restaurant = require("../models/Restaurant");

exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // basic query first
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
