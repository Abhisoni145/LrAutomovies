const express = require('express');
const {
  getUsers,
  getAllComplaints,
  getAllNote,
} = require('../controllers/adminController');
const adminProtect = require('../middlewear/adminMiddleware');
const router = express.Router();

router.get('/users', adminProtect, getUsers);
router.get('/complaints', adminProtect, getAllComplaints);
router.get('/notes', adminProtect, getAllNote);

module.exports = router;
