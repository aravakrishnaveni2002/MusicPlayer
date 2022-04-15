const express = require('express');
const router = express.Router();

const songApi = require('../../../controllers/api/v1/songs_api');

router.get('/',songApi.index);

module.exports = router;