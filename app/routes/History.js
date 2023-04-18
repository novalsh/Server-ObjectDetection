const express = require('express');
const { getHistorys, getHistory, createHistory} = require('../controllers/HistoryController');
const { protect } = require('../controllers/AuthController');

const router = express.Router();

router.get('/api/history', protect, getHistorys);
router.get('/api/history/:id', protect, getHistory);
router.post('/api/history', protect, createHistory);

module.exports = router;
