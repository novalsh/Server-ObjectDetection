const express = require('express');
const { login } = require('../controllers/AuthController');

const router = express.Router();

router.post('/api/login', login);

module.exports = router;