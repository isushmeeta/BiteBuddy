import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { getAssignedOrders, updateOrderStatus, getAvailableOrders, assignOrderSelf } from "../controllers/deliveryController.js";

const router = express.Router();

// Middleware to check if user is delivery partner (optional but good)
const isDelivery = (req, res, next) => {
    if (req.user && req.user.role === 'delivery') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Delivery partners only." });
    }
};

router.get("/assigned", auth, isDelivery, getAssignedOrders);
router.put("/status/:orderId", auth, isDelivery, updateOrderStatus);
router.get("/available", auth, isDelivery, getAvailableOrders); // View unassigned orders
router.post("/assign/:orderId", auth, isDelivery, assignOrderSelf); // Pick up an order

export default router;
