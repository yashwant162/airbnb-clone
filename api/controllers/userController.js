const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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
      expiresIn: "30m"
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

module.exports = { registerUser, loginUser, currentUser, logoutUser, testApi };
