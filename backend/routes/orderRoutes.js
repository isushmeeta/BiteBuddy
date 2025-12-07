// backend/routes/orderRoutes.js
import express from "express";
import {createOrder,reorder, getUserOrders, getOrderById} from "../controllers/orderControllers.js";

const router = express.Router();

// Static test route
router.get("/testuser", (req, res) => res.send("Router works"));

// Create new order
router.post("/", createOrder);

// Reorder
router.post("/reorder/:orderId", reorder);

// Get order details
router.get("/order/:orderId", getOrderById);

// Dynamic user orders route MUST be last
router.get("/:userId", getUserOrders);

export default router;
