//backend/routes/authRoutes.js

import express from "express";
import { registerUser, loginUser, updateUserProfile, getDeliveryPartners } from "../controllers/authController.js";
import { validateRegister } from "../middleware/validateRegister.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);
router.get("/partners", getDeliveryPartners);
router.put("/update/:userId", updateUserProfile);

export default router;
