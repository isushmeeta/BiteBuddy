const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("MongoDB connection error:", err.message));

// Routes
const restaurantRoutes = require("./routes/restaurantRoutes");
app.use("/api/restaurants", restaurantRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes); // mount router directly

const menuRoutes = require("./routes/menuRoutes");
app.use("/api/menu", menuRoutes);


// Start server
const PORT = process.env.PORT || 9169;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
