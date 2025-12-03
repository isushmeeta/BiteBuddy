const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");
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

    // Copy previous order but create a new unique orderId and new _id
    const newOrder = new Order({
      ...prev.toObject(),
      _id: undefined, // let MongoDB generate new _id
      orderDate: new Date(),
      orderId: uuidv4(), // new unique orderId
    });

    await newOrder.save();
    res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Reorder error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getUserOrders,
  createOrder,
  reorder,
  getOrderById, // <-- export it
};

module.exports = { getUserOrders, createOrder, reorder,getOrderById };
