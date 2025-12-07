// backend/routes/menuRoutes.js
import express from "express";
import{getMenuByRestaurant}  from "../controllers/menuControllers.js";

const router = express.Router();

// Get menu by restaurant ID
router.get("/:restaurantId", getMenuByRestaurant);

export default router;
