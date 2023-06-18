const express = require('express');
const { login, loginWithMobile } = require('../controllers/AuthController');

const router = express.Router();

router.post('/api/login', login);
router.post('/api/mobile/login', loginWithMobile);

module.exports = router;