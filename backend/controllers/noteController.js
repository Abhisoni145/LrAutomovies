const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Note = require('../models/noteModel');

const getNotes = expressAsyncHandler(async (req, res) => {
  //check user using jwt

  const user = await User.findById(req.user._id.toString());
  if (!user) {
    res.status(404);
    throw new Error('User is Not Exist');
  }

  // find Notes

  const notes = await Note.find({ user: user._id });

  if (!notes) {
    res.status(404);
    throw new Error('Note not Found');
  }

  res.status(200).json(notes);
});

const addNote = expressAsyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(401);
    throw new Error('Please Fill All Details');
  }

  // check user using jwt
  const user = await User.findById(req.user._id.toString());

  if (!user) {
    res.status(404);
    throw new Error('User is Not Exist');
  } else {
    const note = await Note.create({
      user: user._id,
      car: req.params.id,
      note: text,
    });

    if (!note) {
      res.status(400);
      throw new Error('Note is Create');
    }
    res.status(200).json(note);
  }
});

module.exports = { getNotes, addNote };
