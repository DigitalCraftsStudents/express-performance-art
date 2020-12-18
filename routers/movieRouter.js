const express = require('express');
const router = express.Router();
const { movieHandler } = require('../controllers/movieController');
router.get('/', movieHandler);

module.exports = router;