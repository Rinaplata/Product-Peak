const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_SECRET;

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({
      ok: false,
      error: {
        message: "Access denied",
      },
    });
  try {
    const decoded = jwt.verify(token, secret);
    res.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      error: {
        message: "Invalid token",
      },
    });
  }
}

module.exports = verifyToken;
