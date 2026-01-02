//backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS configuration for multiple origins (development + production)
const allowedOrigins = [
  process.env.CLIENT_URL, // Production Frontend (Vercel)
  'http://localhost:5173', // Local Development
  'http://localhost:3000'
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Log origin for debugging (helps when deployed to Vercel/Render)
      console.log("CORS origin:", origin);
      // Allow requests with no origin (mobile apps, curl, Postman, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Signal disallowed origin without throwing an Error so CORS middleware
      // can respond to preflight requests cleanly (avoids 500 with no CORS headers)
      return callback(null, false);
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/delivery", deliveryRoutes);



// Root
app.get("/", (req, res) => res.send("API Running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
