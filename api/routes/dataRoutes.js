const asyncHandler = require('express-async-handler')
const multer = require('multer')
const photosMiddleware = multer({dest:'uploads'})
const { validateToken } = require('../middleware/validateTokenHandler')
const { getPlaces, uploadPhotos, addPlace } = require('../controllers/dataController');
const { uploadByLink } = require('../controllers/dataController');

const router = require('express').Router()

router.post("/upload-by-link", asyncHandler(uploadByLink));
router.post("/upload",photosMiddleware.array('photos',100) ,uploadPhotos);
router.post("/add-place",asyncHandler(validateToken), asyncHandler(addPlace));
router.get('/get-places',asyncHandler(validateToken),asyncHandler(getPlaces))

module.exports = router