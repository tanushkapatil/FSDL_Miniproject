import jwt from "jsonwebtoken";
import User from "../models/User.js";

const ADMIN_EMAIL = "admin@gmail.com";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is not configured",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    const currentUser = await User.findById(userId).select("_id role email name");

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "User not found for this token",
      });
    }

    // Ensure fixed admin account is always treated as admin.
    if (currentUser.email?.toLowerCase() === ADMIN_EMAIL && currentUser.role !== "admin") {
      currentUser.role = "admin";
      await currentUser.save();
    }

    req.user = {
      id: currentUser._id.toString(),
      role: currentUser.role,
      email: currentUser.email,
      name: currentUser.name,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const allowAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: admin only",
    });
  }

  return next();
};

export const allowUser = (req, res, next) => {
  if (!req.user || req.user.role !== "user") {
    return res.status(403).json({
      success: false,
      message: "Access denied: user only",
    });
  }

  return next();
};
