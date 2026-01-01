// backend/routes/orderRoutes.js
import express from "express";
import { createOrder, reorder, getUserOrders, getOrderById, getAllOrders, assignOrder, cancelOrder, deleteOrder } from "../controllers/orderControllers.js";
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

// Admin: Get all orders
router.get("/all", auth, getAllOrders);

// Admin: Assign order
router.put("/assign/:orderId", auth, assignOrder);

// Cancel order
router.put("/cancel/:orderId", auth, cancelOrder);

// Delete order
router.delete("/delete/:orderId", auth, deleteOrder);

// Dynamic user orders route MUST be last
router.get("/:userId", auth, getUserOrders);

export default router;
