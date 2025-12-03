const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

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

module.exports = router;


