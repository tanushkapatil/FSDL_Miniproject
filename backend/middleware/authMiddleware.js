import jwt from "jsonwebtoken";
import User from "../models/User.js";

const DEFAULT_ADMIN_EMAIL = "admin@gmail.com";

const getAdminEmails = () => {
  const configured = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
  return new Set(
    configured
      .split(",")
      .map((email) => email.toLowerCase().trim())
      .filter(Boolean)
  );
};

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
    const adminEmails = getAdminEmails();

    if (adminEmails.has(currentUser.email?.toLowerCase()) && String(currentUser.role).toLowerCase() !== "admin") {
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
  const role = String(req.user?.role || "").toLowerCase();

  if (!req.user || role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: admin only",
    });
  }

  return next();
};

export const allowUser = (req, res, next) => {
  const role = String(req.user?.role || "").toLowerCase();

  if (!req.user || role !== "user") {
    return res.status(403).json({
      success: false,
      message: "Access denied: user only",
    });
  }

  return next();
};
