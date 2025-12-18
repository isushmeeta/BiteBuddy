//backend/controllers/authControllers.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, phone });

    res.json({ msg: "User registered", user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return res.status(400).json({ msg: "User not found" });
    }

    console.log(`User found: ${user.email}, stored hash: ${user.password.substring(0, 10)}...`);
    const match = await bcrypt.compare(password, user.password);
    console.log(`Password match result: ${match}`);
    if (!match) {
      console.log(`Wrong password for user: ${email}`);
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" });
    res.json({ msg: "Login successful", user });
  } catch (err) {
    console.error(`Login error: ${err.message}`);
    res.status(500).json({ msg: err.message });
  }
};
