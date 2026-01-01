import Order from "../models/Order.js";

// Get orders assigned to the logged-in delivery partner
export const getAssignedOrders = async (req, res) => {
    try {
        const deliveryPartnerId = req.user.id;
        // Find orders assigned to this user that are NOT delivered/cancelled (active orders)
        // Or just all assigned orders. Let's get all for history, or active first.
        // For simplicity, let's get all assigned orders, sorted by date.
        const orders = await Order.find({ deliveryPartnerId }).sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        console.error("Get Assigned Orders Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update order status (e.g., "Out for Delivery", "Delivered")
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const deliveryPartnerId = req.user.id;

        const order = await Order.findOne({ _id: orderId, deliveryPartnerId });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found or not assigned to you" });
        }

        // specific status validation could go here
        const validStatuses = ["Preparing", "Assigned", "Picked Up", "On the Way", "Delivered", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        order.status = status;
        await order.save();

        res.json({ success: true, order });
    } catch (err) {
        console.error("Update Order Status Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Toggle Availability / Self-Assign (Optional for now, let's stick to core)
export const getAvailableOrders = async (req, res) => {
    try {
        // Find orders that are "Preparing" (ready for pickup) and have NO delivery partner assigned
        const orders = await Order.find({ status: "Preparing", deliveryPartnerId: { $exists: false } }).sort({ createdAt: 1 });
        res.json({ success: true, orders });
    } catch (err) {
        console.error("Get Available Orders Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const assignOrderSelf = async (req, res) => {
    try {
        const { orderId } = req.params;
        const deliveryPartnerId = req.user.id;

        const order = await Order.findOne({ _id: orderId });
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (order.deliveryPartnerId) {
            return res.status(400).json({ message: "Order already assigned" });
        }

        order.deliveryPartnerId = deliveryPartnerId;
        order.status = "Out for Delivery"; // Auto update or keep as Preparing? Let's keep as is or update.
        // Usually you assign then pick up. Let's just assign.
        await order.save();
        res.json({ success: true, order });
    } catch (err) {
        console.error("Assign Self Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
