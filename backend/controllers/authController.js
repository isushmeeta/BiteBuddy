//backend/controllers/authControllers.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, phone, role });

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

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax"
    });
    // Return token in body as well for localStorage fallback
    res.json({ msg: "Login successful", user, token });
  } catch (err) {
    console.error(`Login error: ${err.message}`);
    res.status(500).json({ msg: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    res.json({ msg: "Profile updated successfully", user });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ msg: "Failed to update profile" });
  }
};

export const getDeliveryPartners = async (req, res) => {
  try {
    const partners = await User.find({ role: "delivery" }).select("-password");
    res.json({ success: true, partners });
  } catch (err) {
    console.error("Get Partners Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
    });
    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error(`Logout error: ${err.message}`);
    res.status(500).json({ msg: err.message });
  }
};
