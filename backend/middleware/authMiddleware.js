//backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const verifyToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  };

  let token = req.cookies.token;
  let decoded = token ? verifyToken(token) : null;

  if (decoded) {
    req.user = decoded;
    return next();
  }

  // If cookie missing or invalid, check Header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    decoded = verifyToken(token);

    if (decoded) {
      req.user = decoded;
      return next();
    }
  }

  return res.status(403).json({ msg: "Token invalid or expired. Please login again." });
};
