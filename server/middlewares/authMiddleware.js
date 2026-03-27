const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../auth/Controller");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = verifyToken(token);

      req.user = await User.findOne({ email: decoded.email }).select(
        "-password",
      );

      next();
    } catch (error) {
      console.error("JWT error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, not authorized" });
  }
};

module.exports = { protect };
