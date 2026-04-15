import express from "express";
import { createOpportunity, deleteOpportunity, updateOpportunity } from "../controllers/adminOpportunityController.js";
import { getOpportunities } from "../controllers/opportunityController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getOpportunities);
router.post("/", protect, adminMiddleware, createOpportunity);
router.put("/:id", protect, adminMiddleware, updateOpportunity);
router.delete("/:id", protect, adminMiddleware, deleteOpportunity);

export default router;
