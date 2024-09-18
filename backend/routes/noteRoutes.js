const express = require('express');
const { getNotes, addNote } = require('../controllers/noteController');
const protect = require('../middlewear/authMiddleware');

const routes = express.Router({ mergeParams: true });

routes.get('/', protect, getNotes);
routes.post('/', protect, addNote);

module.exports = routes;
