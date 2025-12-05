//cartControllers.js 

import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.json({ items: [] });

  res.json(cart);
};

export const updateQty = async (req, res) => {
  const { qty } = req.body;
  const itemId = req.params.id;

  const cart = await Cart.findOne({ userId: req.user.id });

  const item = cart.items.id(itemId);
  item.qty = qty;

  await cart.save();
  res.json(cart);
};

export const deleteItem = async (req, res) => {
  const itemId = req.params.id;

  const cart = await Cart.findOne({ userId: req.user.id });

  cart.items = cart.items.filter((i) => i._id.toString() !== itemId);

  await cart.save();
  res.json(cart);
};
