const express = require('express');
const authController = require('../../controller/auth.controller');
const router = express.Router();
const authMW = require('../../middleware/auth.mw');
router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authMW, authController.resetPassword);
module.exports = router;
