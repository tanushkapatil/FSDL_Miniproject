import express from "express";
import { getSubmissions } from "../controllers/adminSubmissionController.js";
import { allowAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, allowAdmin, getSubmissions);

export default router;
