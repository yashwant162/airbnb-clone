const express = require("express");
const { registerUser, testApi } = require("../controllers/userController");

const router = express.Router();

// app.use("/login", loginUser);
router.use("/test", testApi);
router.use("/register", registerUser);

module.exports = router;
