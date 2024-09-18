const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { use } = require('../routes/userRoutes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = expressAsyncHandler(async (req, res) => {
  // check if all files is coming
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please Fill All Details');
  }

  // check if user already exists
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    // res.status(401);
    throw new Error('User Alredy Exist');
  }

  // Hash Password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // Register user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(401);
    throw new Error('User Is Not Create');
  }
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
    isAdmin: user.isAdmin,
  });
});

const loginUser = expressAsyncHandler(async (req, res) => {
  // check if all files is coming
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please Fill All Details');
  }

  // check
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Creadentials ');
  }
});

const privateController = expressAsyncHandler(async (req, res) => {
  res.send('IAM Protected Route');
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { registerUser, loginUser, privateController };
