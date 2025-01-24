const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

// Protected route example
router.get("/profile", verifyToken, (req, res) => {
  // Access user info via req.user
  res.json({ message: "Protected data accessed successfully" });
});

module.exports = router;
