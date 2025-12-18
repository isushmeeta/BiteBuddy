import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  getMenuByRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../controllers/menuControllers.js";
import { protect,adminOnly } from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/:restaurantId", getMenuByRestaurant);

router.post("/:restaurantId/item", protect, adminOnly, addMenuItem);
router.put("/:restaurantId/item/:itemId", protect, adminOnly, updateMenuItem);
router.delete("/:restaurantId/item/:itemId", protect, adminOnly, deleteMenuItem);
export default router;