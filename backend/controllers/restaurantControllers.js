// backend/controllers/restaurantControllers.js
import Restaurant from "../models/Restaurant.js";

export const getRestaurants = async (req, res) => {
  try {
    const { cuisine, rating, location, page = 1, limit = 12 } = req.query;
    let filter = {};

    if (cuisine) filter.cuisine = { $regex: new RegExp(`^${cuisine}$`, "i") };
    if (rating) filter.rating = { $gte: Number(rating) };
    if (location) filter.location = { $regex: new RegExp(`^${location}$`, "i") };

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const totalRestaurants = await Restaurant.countDocuments(filter);
    const restaurants = await Restaurant.find(filter)
      .skip(skip)
      .limit(limitNum);

    res.json({
      restaurants,
      totalRestaurants,
      totalPages: Math.ceil(totalRestaurants / limitNum),
      currentPage: pageNum,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

//  MODULE 4 – View Restaurant Location
export const getRestaurantLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({
      name: restaurant.name,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      location: restaurant.location,
    });
  } catch (error) {
    console.error("Location error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
