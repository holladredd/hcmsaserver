const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Appointments endpoint active" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create appointment endpoint" });
});

module.exports = router;
