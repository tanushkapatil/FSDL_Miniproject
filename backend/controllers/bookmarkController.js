import User from "../models/User.js";

export const addBookmark = async (req, res) => {
  try {
    console.log("POST /api/bookmarks request:", req.params.id);

    const userId = req.user?.id;
    const opportunityId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.bookmarks.some((bookmarkId) => bookmarkId.toString() === opportunityId)) {
      user.bookmarks.push(opportunityId);
      await user.save();
    }

    return res.status(200).json({
      message: "Bookmark added",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    console.error("Add bookmark error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    console.log("DELETE /api/bookmarks request:", req.params.id);

    const userId = req.user?.id;
    const opportunityId = req.params.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bookmarks = user.bookmarks.filter((bookmarkId) => bookmarkId.toString() !== opportunityId);
    await user.save();

    return res.status(200).json({
      message: "Bookmark removed",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    console.error("Remove bookmark error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    console.log("GET /api/bookmarks request");

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).populate("bookmarks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Bookmarks fetched successfully",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    console.error("Get bookmarks error:", error);
    return res.status(500).json({ message: error.message });
  }
};
