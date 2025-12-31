//backend/routes/authRoutes.js

import express from "express";
import { registerUser, loginUser, updateUserProfile } from "../controllers/authController.js";
import { validateRegister } from "../middleware/validateRegister.js";




const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);
router.put("/update/:userId", updateUserProfile);

export default router;
