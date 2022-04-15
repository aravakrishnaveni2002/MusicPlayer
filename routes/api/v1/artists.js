const express = require('express');
const router = express.Router();

const artistsApi = require('../../../controllers/api/v1/artists_api');

router.get('/',artistsApi.index);

module.exports = router;