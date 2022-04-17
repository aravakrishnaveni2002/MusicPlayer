const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
const songController = require('../controllers/song_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/signup',passport.checkUserNotSignedIn,userController.signup);
router.get('/signin',passport.checkUserNotSignedIn,userController.signin);
router.get('/signout',userController.signout);
router.post('/create',userController.create);

router.use('/favourite',require('./favourite'));

router.get('/add-song-details',passport.checkAuthentication,songController.addSong);
router.post('/add-song',passport.checkAuthentication,songController.create);
router.get('/play',songController.play);


router.get('/album-all-songs',songController.allSongsOfAlbum);
router.get('/artist-all-songs',songController.allSongsOfArtist);


router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'}

),userController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email','']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/user/signin'}),userController.createSession);

router.get('/verify-account',userController.verifyAccount);

router.get('/forget-password',passport.checkUserNotSignedIn,userController.forgetPassword);
router.post('/create-accessToken',userController.createAccessToken);
router.get('/reset-password',userController.resetPassword);
router.post('/change-password',userController.changePassword);



module.exports = router;