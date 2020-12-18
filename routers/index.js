
const homeRouter = require('./homeRouter');
const movieRouter = require('./movieRouter');

const express = require('express');
const router = express.Router();

router.use('/', homeRouter);
// router.use('/films', movieRouter);

module.exports = router;