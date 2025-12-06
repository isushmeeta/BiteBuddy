//backend/controllers/restaurantControllers.js
import Restaurant from "../models/Restaurant.js";

export const getRestaurants = async (req, res) => {
  try {
    const { cuisine, rating, location } = req.query;
    let filter = {};

    if (cuisine) filter.cuisine = { $regex: new RegExp(`^${cuisine}$`, "i") };
    if (rating) filter.rating = { $gte: Number(rating) };
    if (location) filter.location = { $regex: new RegExp(`^${location}$`, "i") };

    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

