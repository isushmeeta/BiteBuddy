// backend/routes/orderRoutes.js
import express from "express";
import orderController from "../controllers/orderControllers.js";

const router = express.Router();

// Static test route
router.get("/testuser", (req, res) => res.send("Router works"));

// Create new order
router.post("/", orderController.createOrder);

// Reorder
router.post("/reorder/:orderId", orderController.reorder);

// Get order details
router.get("/order/:orderId", orderController.getOrderById);

// Dynamic user orders route MUST be last
router.get("/:userId", orderController.getUserOrders);

export default router;
