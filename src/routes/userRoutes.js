const express = require("express");
const { updateUserDetails } = require("../controllers/userController");

const router = express.Router();

router.put("/users/:id", updateUserDetails);

module.exports = router;
