const express = require("express");
const { registerUser, testApi, loginUser, currentUser, logoutUser, uploadByLink, uploadPhotos } = require("../controllers/userController");
const { validateToken } = require("../middleware/validateTokenHandler")
const asyncHandler = require("express-async-handler");
const router = express.Router();
const multer = require('multer')
const photosMiddleware = multer({dest:'uploads'})

router.get("/test", testApi);
router.post("/login", asyncHandler(loginUser));
router.post("/register", asyncHandler(registerUser));
router.get("/current", asyncHandler(validateToken), currentUser);
router.post("/logout", asyncHandler(logoutUser));
router.post("/upload-by-link", asyncHandler(uploadByLink));
router.post("/upload",photosMiddleware.array('photos',100) ,uploadPhotos);
module.exports = router;
