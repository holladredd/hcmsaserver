const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Facilities endpoint active" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create facility endpoint" });
});

module.exports = router;
