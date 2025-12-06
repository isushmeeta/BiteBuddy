// backend/routes/menuRoutes.js
import express from "express";
import menuController from "../controllers/menuControllers.js";

const router = express.Router();

// Get menu by restaurant ID
router.get("/:restaurantId", menuController.getMenuByRestaurant);

export default router;
