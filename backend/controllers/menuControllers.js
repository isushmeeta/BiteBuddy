
// import mongoose from "mongoose";
// import Menu from "../models/Menu.js";

// // Get menu by restaurant ID
// export const getMenuByRestaurant = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;
//     const menu = await Menu.findOne({ restaurantId: new mongoose.Types.ObjectId(restaurantId) });
//     if (!menu) return res.status(404).json({ success: false, message: "Menu not found" });
//     res.json({ success: true, menu });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Add menu item
// export const addMenuItem = async (req, res) => {
//   try {
//     const { restaurantId } = req.params;
//     const { name, price, description, image } = req.body;

//     const menu = await Menu.findOne({ restaurantId: new mongoose.Types.ObjectId(restaurantId) });
//     if (!menu) return res.status(404).json({ success: false, message: "Menu not found" });

//     menu.items.push({ name, price, description, image });
//     await menu.save();

//     res.json({ success: true, menu });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Update menu item
// export const updateMenuItem = async (req, res) => {
//   try {
//     const { restaurantId, itemId } = req.params;
//     const { name, price, description, image } = req.body;

//     const menu = await Menu.findOne({ restaurantId: new mongoose.Types.ObjectId(restaurantId) });
//     if (!menu) return res.status(404).json({ success: false, message: "Menu not found" });

//     const item = menu.items.id(itemId);
//     if (!item) return res.status(404).json({ success: false, message: "Item not found" });

//     item.name = name;
//     item.price = price;
//     item.description = description;
//     item.image = image;

//     await menu.save();

//     res.json({ success: true, menu });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Delete menu item
// export const deleteMenuItem = async (req, res) => {
//   try {
//     const { restaurantId, itemId } = req.params;

//     const menu = await Menu.findOne({ restaurantId: new mongoose.Types.ObjectId(restaurantId) });
//     if (!menu) return res.status(404).json({ success: false, message: "Menu not found" });

//     menu.items.id(itemId).remove();
//     await menu.save();

//     res.json({ success: true, menu });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
import mongoose from "mongoose";
import Menu from "../models/Menu.js";

/* ---------------------------------------------------
   GET MENU BY RESTAURANT
--------------------------------------------------- */
export const getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    console.log("Fetching menu for restaurantId:", restaurantId);

    // No need to convert restaurantId to ObjectId
    const menu = await Menu.findOne({ restaurantId });

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

    let menu = await Menu.findOne({ restaurantId });
    if (!menu) {
      menu = await Menu.create({ restaurantId, items: [] });
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

    const menu = await Menu.findOne({ restaurantId });

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found"
      });
    }

    const itemIndex = menu.items.findIndex(
      (i) => i._id.toString() === itemId
    );

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

    await menu.save();

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

    // Use string match instead of ObjectId
    const menu = await Menu.findOneAndUpdate(
      { restaurantId },
      { $pull: { items: { _id: itemId } } }, // remove by ID
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
