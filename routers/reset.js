const express = require('express');
const router = express.Router();

const passwordController = require('../controller/password_controller');

router.get('/reset-by-mail/:id', passwordController.resetbyemail);

router.get('/reset-page', passwordController.reset);
router.post('/reset-email-link', passwordController.sendMail);

router.post('/reset-password/:id', passwordController.resetPassword);
module.exports = router;