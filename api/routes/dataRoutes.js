const asyncHandler = require('express-async-handler')
const multer = require('multer')
const photosMiddleware = multer({dest:'uploads'})
const { validateToken } = require('../middleware/validateTokenHandler')
const { getUserPlaces, uploadPhotos, addPlace, getPlaceById, updatePlace, getAllPlaces } = require('../controllers/dataController');
const { uploadByLink } = require('../controllers/dataController');

const router = require('express').Router()

router.post("/upload-by-link", asyncHandler(uploadByLink))
router.post("/upload",photosMiddleware.array('photos',100) ,uploadPhotos)
router.post("/add-place",asyncHandler(validateToken), asyncHandler(addPlace))
router.put("/add-place",asyncHandler(validateToken), asyncHandler(updatePlace))
router.get('/get-user-places',asyncHandler(validateToken),asyncHandler(getUserPlaces))
router.get('/get-all-places',asyncHandler(validateToken),asyncHandler(getAllPlaces))
router.get('/place/:id',asyncHandler(validateToken),asyncHandler(getPlaceById))


module.exports = router