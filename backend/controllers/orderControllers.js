//backend/controllers/orderControllers.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { v4 as uuidv4 } from "uuid";

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ customerId: userId }).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const createOrder = async (req, res) => {
  try {
    const { phone } = req.body;
    const phoneRegex = /^01[0-9]{9}$/;

    if (!phone || !phoneRegex.test(phone)) {
      return res.status(400).json({
        msg: "Invalid phone number. Please enter a valid 11-digit number."
      });
    }

    const order = new Order(req.body);
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const reorder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const prev = await Order.findById(orderId);
    if (!prev) return res.status(404).json({ message: "Order not found" });

    const orderData = prev.toObject();

    // Remove fields that should not be copied
    delete orderData._id;
    delete orderData.__v;
    delete orderData.createdAt;
    delete orderData.updatedAt;

    const newOrder = new Order({
      ...orderData,
      orderId: uuidv4(),
      orderDate: new Date(),
      status: "Pending", // Ensure new order starts as Pending
    });

    await newOrder.save();
    res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Reorder Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during reorder",
      error: err.message
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
