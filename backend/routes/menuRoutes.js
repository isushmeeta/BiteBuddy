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

router.post("/:restaurantId/item", addMenuItem);
router.put("/:restaurantId/item/:itemId", updateMenuItem);
router.delete("/:restaurantId/item/:itemId", deleteMenuItem);
export default router;