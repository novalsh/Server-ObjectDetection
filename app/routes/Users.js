const express = require('express');
const { getUser, getUsers, createUser, updateUser, deleteUser } = require('../controllers/UserController');
const { protect } = require('../controllers/AuthController');

const router = express.Router();

router.get('/api/account', protect, getUsers);
router.get('/api/account/:id', protect, getUser);
router.post('/api/account', createUser);
router.put('/api/account/:id', protect, updateUser);
router.delete('/api/account/:id', protect, deleteUser);

module.exports = router;