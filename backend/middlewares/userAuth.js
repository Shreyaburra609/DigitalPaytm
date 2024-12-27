const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/connection");

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded?.id) {
        req.userId = decoded.id;
        return next();
      }
      res.status(401).json({ message: "Token missing user ID" });
    } catch {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res
      .status(401)
      .json({
        message: "Authorization header missing or improperly formatted",
      });
  }
};

module.exports = auth;
