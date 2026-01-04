
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Menu from "../models/Menu.js";

export const addToCart = async (req, res) => {
  const { name, price, image, qty } = req.body;

  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({
      userId: req.user.id,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (i) => i.name === name
  );

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.items.push({
      name,
      price,
      image,
      qty,
    });
  }

  await cart.save();
  res.json(cart);
};


export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.json({ items: [] });
  res.json({ items: cart.items });
};


export const updateQty = async (req, res) => {
  const { qty } = req.body;
  const itemId = req.params.id;

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ msg: "Cart not found" });

  const item = cart.items.id(itemId);
  if (!item) return res.status(404).json({ msg: "Item not found" });

  item.qty = qty;
  await cart.save();
  res.json(cart);
};

export const deleteItem = async (req, res) => {
  const itemId = req.params.id;

  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ msg: "Cart not found" });

  cart.items = cart.items.filter(i => i._id.toString() !== itemId);
  await cart.save();
  res.json(cart);
};

export const reorderToCart = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    // 1. Find Order
    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ msg: "Order not found" });

    // 2. Find or Create Cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // 3. Replace Cart with Order Items
    cart.items = [];

    // 4. Populate Items (Lookup images)
    for (const orderItem of order.items) {
      let image = "default-food.jpg"; // Fallback

      // Try to find image in Menu
      const menu = await Menu.findOne({ "items.name": orderItem.item }, { "items.$": 1 });
      if (menu && menu.items && menu.items.length > 0) {
        image = menu.items[0].image;
      }

      cart.items.push({
        name: orderItem.item,
        price: orderItem.price,
        qty: orderItem.qty,
        image: image
      });
    }

    await cart.save();
    res.json({ success: true, cart });

  } catch (err) {
    console.error("Reorder to Cart Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
