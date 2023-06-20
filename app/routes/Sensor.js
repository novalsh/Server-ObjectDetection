const express = require('express');
const { getSensors, getSensor, createSensor, getSensorByToken, updateSensor, updateSensorRaspberry, deleteSensor, getSensorByBranchId } = require('../controllers/SensorController');
const { protect } = require('../controllers/AuthController');

const router = express.Router();

router.get('/api/sensor', protect, getSensors);
router.get('/api/sensor/:id', protect, getSensor);
router.post('/api/sensor', protect, createSensor);
router.put('/api/sensor/:id', protect, updateSensor);
router.delete('/api/sensor/:id', protect, deleteSensor);
// router.put('/api/times-sensor',protect, updateAllSensorTimes);
router.get('/api/sensors/token', protect, getSensorByToken);
router.get('/api/sensors/branch/:id', protect, getSensorByBranchId);
router.post('/api/sensor-active', updateSensorRaspberry);
// router.post('/api/createToSensor', createToSensor);

module.exports = router;
