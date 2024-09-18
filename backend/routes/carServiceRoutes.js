const express = require('express');
const protect = require('../middlewear/authMiddleware');
const {
  getComplaints,
  raiseComplaint,
  getComplaint,
  closeComplaint,
} = require('../controllers/carServiceController');

const router = express.Router();

router.get('/', protect, getComplaints);
router.post('/', protect, raiseComplaint);
router.get('/:id', protect, getComplaint);
router.put('/:id', protect, closeComplaint);

// notes routes

router.use('/:id/note', require('./noteRoutes'));

module.exports = router;
