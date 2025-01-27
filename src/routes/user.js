const router = require("express").Router();
const express = require("express");
const { updateUserDetails } = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({ message: "User route working" });
});

// User details update route
// router.put("/:id", updateUserDetails);
// router.put("/users/:id", updateUserDetails);

module.exports = router;
