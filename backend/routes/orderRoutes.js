// backend/routes/orderRoutes.js
import express from "express";
import { createOrder, reorder, getUserOrders, getOrderById } from "../controllers/orderControllers.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Static test route
router.get("/testuser", (req, res) => res.send("Router works"));

// Create new order
router.post("/", auth, createOrder);

// Reorder
router.post("/reorder/:orderId", auth, reorder);

// Get order details
router.get("/order/:orderId", auth, getOrderById); // Protect this as well

// Dynamic user orders route MUST be last
router.get("/:userId", auth, getUserOrders);

export default router;
