const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Timeline endpoint active" });
});

module.exports = router;
