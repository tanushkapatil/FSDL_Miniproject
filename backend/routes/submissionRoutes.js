import express from "express";
import { getSubmissions } from "../controllers/adminSubmissionController.js";
import { createSubmission, getMySubmissions } from "../controllers/submissionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protect, adminMiddleware, getSubmissions);
router.get("/me", protect, getMySubmissions);
router.post("/", protect, createSubmission);

export default router;
