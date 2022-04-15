const express = require('express');
const router  = express.Router();

router.use('/songs',require('./songs'));
router.use('/users',require('./users'));
router.use('/albums',require('./albums'));
router.use('/artists',require('./artists'));

module.exports = router;