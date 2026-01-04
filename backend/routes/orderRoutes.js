import express from "express";
import { createOrder, reorder, getUserOrders, getOrderById, getAllOrders, assignOrder, cancelOrder, deleteOrder } from "../controllers/orderControllers.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Static test route
router.get("/testuser", (req, res) => res.send("Router works"));

router.post("/", auth, createOrder);

router.post("/reorder/:orderId", auth, reorder);

router.get("/order/:orderId", auth, getOrderById); // Protect this as well

router.get("/all", auth, getAllOrders);

router.put("/assign/:orderId", auth, assignOrder);

router.put("/cancel/:orderId", auth, cancelOrder);

router.delete("/delete/:orderId", auth, deleteOrder);

// Dynamic user orders route MUST be last
router.get("/:userId", auth, getUserOrders);

export default router;
