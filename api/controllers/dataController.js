const User = require('../models/userModel')
const Place = require('../models/placeModel')
const imageDownloader = require("image-downloader")
const path = require('path');
const fs = require("fs")

const uploadByLink = async (req, res) => {

  const {link} = req.body
  const newName = 'photos' + Date.now() + '.jpg'
  const destination = path.join(__dirname, '..', 'uploads', newName);

  try {
    await imageDownloader.image({
      url: link,
      dest: destination,
    });
    console.log("filename: "+ newName)
    res.json(newName)

  } catch (error) {
    res.status(400);
    throw new Error("This image cannot be downloaded");
  }

}

const uploadPhotos = async (req, res) => {
  const uploadedFiles = []
  for(let i = 0; i < req.files.length; i++){
    const {path, originalname} = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
    const newPath = path + '.' + ext
    
    console.log(newPath)
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace("uploads\\",""))
  }

  res.json(uploadedFiles)
}

const addPlace = async (req,res) => {
  const email = req.user.email
  const userData = await User.findOne({ email });
  console.log(req.body)
  const {
        title, address, addPhotos,
        description,extraInfo,perks,
        checkIn,checkOut,maxGuests,price
        } = req.body
  const response = await Place.create({
    owner: userData.id,
    title: title,
    address:address,
    photos: addPhotos,
    description: description,
    extrainfo: extraInfo,
    perks: perks,
    checkIn: checkIn,
    checkOut: checkOut,
    maxGuests: maxGuests,
    price: price
  })

  res.status(200).json(response)
  
}

const getAllPlaces = async (req,res) => {
  const places = await Place.find()
  res.json({"placesData":places})
}

const getUserPlaces = async (req,res) => {  
  let {id} = req.user
  console.log(id)

  const places = await Place.find({owner:id})
  console.log(places)

  res.json({"placesData":places})
}

const getPlaceById = async (req,res) => {
    const {id} = req.params
    const place = await Place.findById(id)
    res.json({"placeData":place})
    
}

const updatePlace = async (req,res) => {
  const {
        id,title, address, addPhotos,
        description,extraInfo,perks,
        checkIn,checkOut,maxGuests,price
        } = req.body  

  const PlaceDoc = await Place.findById(id)
  
  if(PlaceDoc.owner.toString() === req.user.id){
      PlaceDoc.set({
        title: title,
        address:address,
        photos: addPhotos,
        description: description,
        extrainfo: extraInfo,
        perks: perks,
        checkIn: checkIn,
        checkOut: checkOut,
        maxGuests: maxGuests,
        price: price
          })
      await PlaceDoc.save()
      return res.json('Data uddated Successfully')
  }
  res.status(400).json("user id did not match")
}

module.exports = {uploadByLink, uploadPhotos, addPlace, getUserPlaces, getPlaceById, updatePlace, getAllPlaces}