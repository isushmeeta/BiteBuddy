const Menu = require("../models/Menu");

exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const menu = await Menu.findOne({ restaurantId });

    if (!menu)
      return res.status(404).json({ success: false, message: "Menu not found" });

    res.json({ success: true, menu });
  } catch (err) {
    console.error("Menu fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
