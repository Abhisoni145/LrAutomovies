const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Car = require('../models/carServiceModal');

const getComplaints = expressAsyncHandler(async (req, res) => {
  // check user using JWT

  const user = await User.findById(req.user._id.toString());
  if (!user) {
    res.status(404);
    throw new Error('User Not Exist');
  }

  // find complaints

  const complaints = await Car.find({ user: user._id });

  if (!complaints) {
    res.status(404);
    throw new Error('complaints not found');
  }

  res.status(200).json(complaints);
});

const getComplaint = expressAsyncHandler(async (req, res) => {
  // check user using JWT

  const user = await User.findById(req.user._id.toString());
  if (!user) {
    res.status(404);
    throw new Error('User Not Exist');
  }

  // find complaints

  const complaint = await Car.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error('complaint (single) not found');
  }

  res.status(200).json(complaint);
});

const raiseComplaint = expressAsyncHandler(async (req, res) => {
  const { car, description, registration } = req.body;

  if (!car || !description || !registration) {
    res.status(401);
    throw new Error('please fill all details');
  }

  // check user using JWT
  const user = await User.findById(req.user._id.toString());
  if (!user) {
    res.status(404);
    throw new Error('User Not Exist');
  }

  const complaint = await Car.create({
    user: req.user._id,
    car: car.toLowerCase(),
    registration,
    description: description,
    status: 'open',
  });
  if (!complaint) {
    res.status(400);
    throw new Error('complaint Not Raised');
  }
  res.status(201).json(complaint);
});

const closeComplaint = expressAsyncHandler(async (req, res) => {
  // check user using JWT
  const user = await User.findById(req.user._id.toString());
  if (!user) {
    res.status(404);
    throw new Error('User Not Exist');
  }

  const updatedComplaint = await Car.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!updatedComplaint) {
    res.status(400);
    throw new Error('complaint Not Raised');
  }
  res.status(202).json(updatedComplaint);
});

module.exports = {
  raiseComplaint,
  closeComplaint,
  getComplaint,
  getComplaints,
};
