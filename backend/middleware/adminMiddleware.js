export const adminMiddleware = (req, res, next) => {
  console.log("Admin middleware check:", req.user);

  const normalizedRole = String(req.user?.role || "").toLowerCase();

  if (!req.user || normalizedRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: admin only",
    });
  }

  return next();
};
