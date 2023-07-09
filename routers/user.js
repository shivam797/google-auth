const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/user_controller');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.get('/sign-out', userController.signOut);

router.get('/reset',passport.checkAuthentication, userController.reset);

router.get('/auth/google', passport.authenticate(
    'google', {scope :['profile', 'email'] }
));



router.post('/create-session', passport.authenticate('local',
                            {failureRedirect:'/user/sign-in'}), userController.createSession);
router.post('/create-user', userController.createUser);
router.post('/reset-password',passport.checkAuthentication, userController.resetPassword);
module.exports = router;