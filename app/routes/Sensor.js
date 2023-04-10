const express = require('express');
const { getSensors, getSensor, createSensor, updateSensor, deleteSensor } = require('../controllers/SensorController');
const { protect } = require('../controllers/AuthController');

const router = express.Router();

router.get('/api/sensor', protect, getSensors);
router.get('/api/sensor/:id', protect, getSensor);
router.post('/api/sensor', protect, createSensor);
router.put('/api/sensor/:id', protect, updateSensor);
router.delete('/api/sensor/:id', protect, deleteSensor);

module.exports = router;
