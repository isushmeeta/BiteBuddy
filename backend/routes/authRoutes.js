
import express from "express";
import { registerUser, loginUser, updateUserProfile, getDeliveryPartners, forgotPassword, resetPassword } from "../controllers/authController.js";
import { validateRegister } from "../middleware/validateRegister.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);
router.get("/partners", getDeliveryPartners);
router.put("/update/:userId", updateUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
