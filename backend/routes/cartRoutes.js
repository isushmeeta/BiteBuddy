//backend/routes/cartRoutes.js

import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { getCart, updateQty, deleteItem } from "../controllers/cartControllers.js";
import { addToCart } from "../controllers/cartControllers.js";

const router = express.Router();

router.get("/", auth, getCart);
router.post("/add", auth, addToCart);
router.put("/update/:id", auth, updateQty);
router.delete("/delete/:id", auth, deleteItem);

export default router;
