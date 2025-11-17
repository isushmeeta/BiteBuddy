const Restaurant = require("../models/Restaurant");

exports.getRestaurants = async (req, res) => {
  try {
    const { cuisine, rating, location } = req.query;

    let filter = {};

    // Case-insensitive match for cuisine
    if (cuisine) {
      filter.cuisine = { $regex: new RegExp(`^${cuisine}$`, "i") };
    }

    // Rating greater than or equal
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    // Case-insensitive match for location
    if (location) {
      filter.location = { $regex: new RegExp(`^${location}$`, "i") };
    }

    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
