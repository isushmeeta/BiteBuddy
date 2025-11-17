const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Restaurant model (make sure this path is correct)
const Restaurant = require("./models/Restaurant");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// -------------------------
// Connect to MongoDB
// -------------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

// -------------------------
// TEST ROUTE
// -------------------------
// app.get("/test", async (req, res) => {
//   try {
//     const restaurants = await Restaurant.find();
//     res.json(restaurants);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// -------------------------
// API ROUTES
// -------------------------
app.use("/api/restaurants", require("./routes/restaurantRoutes"));

// -------------------------
// Start server
// -------------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
