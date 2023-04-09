const express = require('express');
const { getHistorys, getHistory} = require('../controllers/HistoryController');

const router = express.Router();

router.get('/api/history', getHistorys);
router.get('/api/history/:id', getHistory);

module.exports = router;
