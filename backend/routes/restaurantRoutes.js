// backend/routes/restaurantRoutes.js
import express from "express";
import { getRestaurants,getRestaurantLocation} from "../controllers/restaurantControllers.js";

const router = express.Router();

router.get("/", getRestaurants);
router.get("/:id/location", getRestaurantLocation);
export default router;
