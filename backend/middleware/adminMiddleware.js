export const protect = async (req, res, next) => {
  // JWT verification logic
};
export const adminOnly = (req, res, next) => {
  if (!req.user?.name?.toLowerCase().startsWith("admin")) {
    return res.status(403).json({
      success: false,
      message: "Admin access only"
    });
  }
  next();
};
