const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/signup',passport.checkUserNotSignedIn,userController.signup);
router.get('/signin',passport.checkUserNotSignedIn,userController.signin);
router.get('/signout',userController.signout);
router.post('/create',userController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'}

),userController.createSession);

module.exports = router;