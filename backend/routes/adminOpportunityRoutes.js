import express from "express";
import { allowAdmin, protect } from "../middleware/authMiddleware.js";
import { createOpportunity, deleteOpportunity, updateOpportunity } from "../controllers/adminOpportunityController.js";
import { getOpportunities } from "../controllers/opportunityController.js";

const router = express.Router();

router.get("/", getOpportunities);
router.post("/", protect, allowAdmin, createOpportunity);
router.put("/:id", protect, allowAdmin, updateOpportunity);
router.delete("/:id", protect, allowAdmin, deleteOpportunity);

export default router;
