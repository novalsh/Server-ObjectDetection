const express = require('express');
const { getSensors, getSensor, createSensor, getSensorByToken, updateSensor, deleteSensor, updateAllSensorTimes } = require('../controllers/SensorController');
const { protect } = require('../controllers/AuthController');

const router = express.Router();

router.get('/api/sensor', protect, getSensors);
router.get('/api/sensor/:id', protect, getSensor);
router.post('/api/sensor', protect, createSensor);
router.put('/api/sensor/:id', protect, updateSensor);
router.delete('/api/sensor/:id', protect, deleteSensor);
router.put('/api/times-sensor',protect, updateAllSensorTimes);
router.get('/api/sensors/token', protect, getSensorByToken);

module.exports = router;
