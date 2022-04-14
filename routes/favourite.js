const express = require('express');
const router = express.Router();

const favouriteController = require('../controllers/favourite_controller');

router.get('/songs',favouriteController.favSongs);
router.get('/toggle-fav',favouriteController.toogleFav);

module.exports = router;