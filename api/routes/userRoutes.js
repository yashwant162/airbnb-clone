const express = require("express");
const { registerUser, testApi, loginUser, currentUser, logoutUser } = require("../controllers/userController");
const { validateToken } = require("../middleware/validateTokenHandler")
const asyncHandler = require("express-async-handler");
const router = express.Router();


router.get("/test", testApi);
router.post("/login", asyncHandler(loginUser));
router.post("/register", asyncHandler(registerUser));
router.get("/current", asyncHandler(validateToken), currentUser);
router.post("/logout", asyncHandler(logoutUser));

module.exports = router;
