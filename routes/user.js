const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const password_stronge_only = require('../middleware/password-stronge-only');

router.post('/signup', password_stronge_only, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;