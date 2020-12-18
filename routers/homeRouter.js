const express = require('express');
const router = express.Router();

const { 
    homeHandler
} = require('../controllers/homeController');

router.get('/', homeHandler);

module.exports = router;