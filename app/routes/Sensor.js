const express = require('express');
const { getSensors, getSensor, createSensor, updateSensor, deleteSensor } = require('../controllers/SensorController');

const router = express.Router();

router.get('/api/sensor', getSensors);
router.get('/api/sensor/:id', getSensor);
router.post('/api/sensor', createSensor);
router.put('/api/sensor/:id', updateSensor);
router.delete('/api/sensor/:id', deleteSensor);

module.exports = router;
