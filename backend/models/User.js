//backend/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  role: { type: String, enum: ["customer", "restaurant", "admin", "delivery"], default: "customer" },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

export default mongoose.model("User", userSchema);