const asyncHandler = require('express-async-handler')
const multer = require('multer')
const photosMiddleware = multer({dest:'uploads'})
const { validateToken } = require('../middleware/validateTokenHandler')
const { getUserPlaces, uploadPhotos, addPlace, updatePlace, getBookingById,
       getAllPlaces,getPlaceById, bookPlace, getUserBookings} = require('../controllers/dataController');
const { uploadByLink } = require('../controllers/dataController');

const router = require('express').Router()

router.post("/upload-by-link", asyncHandler(uploadByLink))
router.post("/upload",photosMiddleware.array('photos',100) ,uploadPhotos)
router.post("/add-place",asyncHandler(validateToken), asyncHandler(addPlace))
router.put("/add-place",asyncHandler(validateToken), asyncHandler(updatePlace))
router.get('/get-user-places',asyncHandler(validateToken),asyncHandler(getUserPlaces))
router.get('/get-all-places',asyncHandler(getAllPlaces))
router.get('/get-user-place-by-id/:id',asyncHandler(validateToken),asyncHandler(getPlaceById))
router.get('/place/:id',asyncHandler(getPlaceById))
router.post('/book-place',asyncHandler(validateToken), asyncHandler(bookPlace))
router.get('/get-user-bookings',asyncHandler(validateToken), asyncHandler(getUserBookings))
router.get('/get-booking-by-id',asyncHandler(validateToken),asyncHandler(getBookingById))

module.exports = router