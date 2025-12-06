// backend/routes/restaurantRoutes.js
import express from "express";
import { getRestaurants } from "../controllers/restaurantControllers.js";

const router = express.Router();

router.get("/", getRestaurants);

export default router;
