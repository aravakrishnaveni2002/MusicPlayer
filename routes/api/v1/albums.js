const express = require('express');
const router = express.Router();

const albumApi = require('../../../controllers/api/v1/albums_api');

router.get('/',albumApi.index);

module.exports = router;