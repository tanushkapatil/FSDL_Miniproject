import express from "express";
import { getMe, login, registerUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;
