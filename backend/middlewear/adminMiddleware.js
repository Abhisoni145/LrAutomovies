const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const adminProtect = expressAsyncHandler(async (req, res, next) => {
  try {
    let token = '';

    // check if request is coming with token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // split token with bearer
      token = req.headers.authorization.split(' ')[1];

      // decoded token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find if user Exist
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(401);
        throw new Error('UnAthirized Access : User Not Found');
      }

      if (user.isAdmin) {
        req.user = user;
        next();
      }
    } else {
      res.status(401);
      throw new Error('Unauthorized Access : Admin Access Only');
    }
  } catch (error) {
    res.status(401);
    throw new Error('Unauthorized Access : Admin Access Only');
  }
});
module.exports = adminProtect;
