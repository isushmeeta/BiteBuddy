
import mongoose from "mongoose";
import Menu from "../models/Menu.js";

/* ---------------------------------------------------
   GET MENU BY RESTAURANT
--------------------------------------------------- */
export const getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    console.log("Fetching menu for restaurantId:", restaurantId);

    // Force conversion of restaurantId to ObjectId
    const objectId = new mongoose.Types.ObjectId(restaurantId);
    console.log("Fetching menu for restaurantId (ObjectId):", objectId);

    const menu = await Menu.findOne({ restaurantId: objectId });

    // If no menu exists, create an empty one
    if (!menu) {
      console.log("No menu found, creating new menu");
      const newMenu = await Menu.create({
        restaurantId,
        items: []
      });
      return res.json({ success: true, menu: newMenu });
    }

    console.log(
      "Returning menu with",
      menu.items.length,
      "items"
    );
    res.json({ success: true, menu });

  } catch (err) {
    console.error("Get Menu Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------------------------------------------
   ADD MENU ITEM
--------------------------------------------------- */
export const addMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, price, description, image } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const objectId = new mongoose.Types.ObjectId(restaurantId);

    let menu = await Menu.findOne({ restaurantId: objectId });
    if (!menu) {
      menu = await Menu.create({ restaurantId: objectId, items: [] });
    }

    menu.items.push({
      name,
      price: Number(price),
      description,
      image
    });

    await menu.save();

    res.json({ success: true, menu });

  } catch (err) {
    console.error("Add Menu Item Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------------------------------------------
   UPDATE MENU ITEM
--------------------------------------------------- */
export const updateMenuItem = async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;
    const { name, price, description, image } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const objectId = new mongoose.Types.ObjectId(restaurantId);
    const menu = await Menu.findOne({ restaurantId: objectId });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    console.log("Menu found with", menu.items.length, "items");

    const itemIndex = menu.items.findIndex(
      (i) => i._id.toString() === itemId
    );

    console.log("Item index:", itemIndex, "for itemId:", itemId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
        availableItems: menu.items.map((i) => i._id.toString()),
      });
    }

    menu.items[itemIndex].name = name;
    menu.items[itemIndex].price = Number(price);
    menu.items[itemIndex].description = description;
    menu.items[itemIndex].image = image;

    console.log("Updated item:", menu.items[itemIndex]);

    await menu.save();

    console.log("Menu saved successfully");

    res.json({ success: true, menu });

  } catch (err) {
    console.error("Update Menu Item Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------------------------------------------
   DELETE MENU ITEM
--------------------------------------------------- */
export const deleteMenuItem = async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;

    console.log("Deleting menu item:", itemId);

    const menu = await Menu.findOneAndUpdate(
      { restaurantId: new mongoose.Types.ObjectId(restaurantId) },
      { $pull: { items: { _id: new mongoose.Types.ObjectId(itemId) } } }, // remove by ID
      { new: true } // return updated document
    );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    console.log("Menu item deleted successfully");
    res.json({ success: true, menu });

  } catch (err) {
    console.error("Delete Menu Item Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
