const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const testApi = (req, res) => {
  res.json("Ok its working");
  console.log("yes its hitting");
};

const registerUser = async (req, res) => {
  console.log("In post");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    // throw new Error("All fields are mandatory")
    res.json({
      title: "Validation Error",
      message: "All fields are mandatory",
      stackTree: new Error().stack,
    });
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(400);
    res.json({
      title: "Validation Error",
      message: "User with given email already exists",
      stackTree: new Error().stack,
    });
  }

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });
  console.log(`User created ${user}`);
  res.status(201).json(user);
};

module.exports = { registerUser, testApi };
