// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { ensureGuest, ensureAuth } = require('../middlewares/auth');

// Đăng ký
router.get('/register', ensureGuest, authController.registerGet);
router.post('/register', ensureGuest, authController.registerPost);

// Đăng nhập
router.get('/login', ensureGuest, authController.loginGet);
router.post('/login', ensureGuest, authController.loginPost);

// Quên mật khẩu
router.get('/forgot', ensureGuest, authController.forgotGet);
router.post('/forgot', ensureGuest, authController.forgotPost);

// Đăng xuất
router.get('/logout', ensureAuth, authController.logout);

module.exports = router;