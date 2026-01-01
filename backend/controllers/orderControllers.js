import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import mongoose from "mongoose";
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
    console.log("--- CREATE ORDER START ---");
    console.log("Request Body:", req.body);
    console.log("User from Token:", req.user);

    const { address, phone, paymentMethod, paymentDetails } = req.body;

    if (!req.user || !req.user.id) {
      console.log("ERROR: No user ID in request");
      return res.status(401).json({ msg: "User not authenticated correctly" });
    }

    // 1. Fetch User's Cart
    console.log(`Searching for cart with userId: ${req.user.id}`);

    // Try querying with string first, then ObjectId if needed
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      console.log("Cart not found with string ID. Trying ObjectId...");
      cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(req.user.id) });
    }

    console.log("Cart Found:", cart);

    if (!cart) {
      console.log("ERROR: Cart is null. Cannot proceed.");
      return res.status(400).json({ msg: "Cart is empty" });
    }

    if (!cart.items || cart.items.length === 0) {
      console.log("ERROR: Cart has no items.");
      return res.status(400).json({ msg: "Cart is empty" });
    }

    // Calculate Total Price
    console.log("Calculating total price...");
    const totalPrice = cart.items.reduce((total, item) => total + (item.price * item.qty), 0);
    console.log("Total Price:", totalPrice);

    // Map cart items to match Order schema (Cart has 'name', Order expects 'item')
    const orderItems = cart.items.map(cartItem => ({
      item: cartItem.name,
      qty: cartItem.qty,
      price: cartItem.price
    }));

    // Generate 8-character alphanumeric Order ID
    const generateShortId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    // 2. Create Order Object
    const newOrder = new Order({
      orderId: generateShortId(),
      customerId: req.user.id,
      restaurantName: "Mix",
      items: orderItems,
      totalPrice: totalPrice,
      address,
      phone,
      paymentMethod,
      paymentDetails
    });

    // 3. Save Order
    console.log("Saving Order...", newOrder);
    await newOrder.save();
    console.log("Order Saved Successfully!");

    // 4. Clear Cart
    console.log("Clearing Cart...");
    await Cart.findOneAndDelete({ userId: req.user.id });
    console.log("Cart Cleared.");

    res.json({ success: true, orderId: newOrder.orderId, order: newOrder });
  } catch (err) {
    console.error("CRITICAL ERROR IN CREATE ORDER:", err);
    res.status(500).json({ success: false, message: "Server error creating order", error: err.message });
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

    // Generate 8-character alphanumeric Order ID
    const generateShortId = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    const newOrder = new Order({
      ...orderData,
      orderId: generateShortId(),
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
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const assignOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryPartnerId } = req.body;

    const order = await Order.findOne({ $or: [{ _id: orderId }, { orderId: orderId }] });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.deliveryPartnerId = deliveryPartnerId;
    order.status = "Assigned";

    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    console.error("Assign Order Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ $or: [{ _id: orderId }, { orderId: orderId }] });
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Cancelled";
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    console.error("Cancel Order Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOneAndDelete({ $or: [{ _id: orderId }, { orderId: orderId }] });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("Delete Order Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
