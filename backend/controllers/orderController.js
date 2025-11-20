const Order = require("../models/Order");

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching orders for user:", userId); // debug
    const orders = await Order.find({ customerId: userId }).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getUserOrders };


const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const reorder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const prev = await Order.findById(orderId);
    if (!prev) return res.status(404).json({ message: "Order not found" });
    const newOrder = new Order({ ...prev.toObject(), _id: undefined, orderDate: new Date() });
    await newOrder.save();
    res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getUserOrders, createOrder, reorder };
