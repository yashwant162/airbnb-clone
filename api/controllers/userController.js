const User = require("../models/userModel");
const Place = require("../models/placeModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const imageDownloader = require("image-downloader")
const path = require('path');
const fs = require("fs")

const testApi = (req, res) => {
  res.json("Ok its working");
  console.log("yes its hitting");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)

  if (!email || !password) {
    res.status(400)
    throw new Error("All fields are mandatory")
  }
  const user = await User.findOne({ email });
  console.log(user)
  if (user && (await bcrypt.compare(password, user.password))) {

    const payload = {
      name: user.name,
      email: user.email,
      id: user.id
    }
    const options = {
      expiresIn: "300m"
    }

    const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, options)
    console.log(accessToken)

    res.status(200).cookie("Token", accessToken).json(payload)
  }
  else {
    res.status(400)
    throw new Error("Email or Password is wrong")
  }

};

const registerUser = async (req, res) => {
  console.log("In post");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User with given email already exists");
  }

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  console.log(`User created ${user}`);

  if (user) res.status(201).json({ _id: user.id, email: user.email });
  else throw new Error("User data is not valid");
};

const currentUser = async (req, res) => {
  result = {
    "name": req.user.name,
    "email": req.user.email,
  }
  console.log(result)
  res.status(200).json(result)
}

const logoutUser = async (req, res) => {
  res.cookie("Token", undefined).json(true)

}

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
  const {
        title, address, addPhotos,
        description,extraInfo,perks,
        checkIn,checkOut,maxGuests
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
    maxGuests: maxGuests
  })

  res.status(200).json(response)
  
}

module.exports = { registerUser, loginUser, currentUser, logoutUser, uploadByLink,uploadPhotos, addPlace, testApi };
