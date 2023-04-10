const express = require('express');
const { getHistorys, getHistory} = require('../controllers/HistoryController');
const { protect } = require('../controllers/AuthController');

const router = express.Router();

router.get('/api/history', protect, getHistorys);
router.get('/api/history/:id', protect, getHistory);

module.exports = router;
