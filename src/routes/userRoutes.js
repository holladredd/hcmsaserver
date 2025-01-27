const express = require("express");
const router = express.Router();
const { updateUser } = require("../controllers/userController");

router.patch("/:id", updateUser);

module.exports = router;
