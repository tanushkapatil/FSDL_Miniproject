import express from "express";
import { addBookmark, getBookmarks, removeBookmark } from "../controllers/bookmarkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getBookmarks);
router.post("/:id", protect, addBookmark);
router.delete("/:id", protect, removeBookmark);

export default router;
