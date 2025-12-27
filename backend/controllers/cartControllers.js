//backend/controllers/cartControllers.js

import Cart from "../models/Cart.js";

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
