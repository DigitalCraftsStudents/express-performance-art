const express = require('express');
const router = express.Router();

const { 
    homeHandler
} = require('../router/homeController');

router.get('/', homeHandler);

module.exports = router;