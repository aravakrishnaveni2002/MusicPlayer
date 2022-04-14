const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

const favouriteController = require('../controllers/favourite_controller');

router.get('/songs',passport.checkAuthentication,favouriteController.favSongs);
router.get('/albums',passport.checkAuthentication,favouriteController.favAlbums);
router.get('/album-songs',passport.checkAuthentication,favouriteController.favAlbumSongs);
router.get('/toggle-fav',passport.checkAuthentication,favouriteController.toogleFav);

module.exports = router;