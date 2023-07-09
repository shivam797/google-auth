const passport = require('passport');
const express = require('express');
const homecontroller = require('../controller/home');
const router = express.Router();
const userController = require('../controller/user_controller');


router.use('/user', require('./user'));
router.use('/reset', require('./reset'));

router.get('/user/auth/google/callback', passport.authenticate('google',
                                    {failureRedirect:'sign-in'}), userController.createSession);
router.get('/',passport.checkAuthentication, homecontroller.home);
// router.use('/user', require('./user'));

module.exports = router;