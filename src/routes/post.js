const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // Create new post
});

router.get("/", async (req, res) => {
  // Get all posts
});

router.get("/:id", async (req, res) => {
  // Get specific post
});

module.exports = router;
