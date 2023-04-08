import express from 'express';
import { getSensors, getSensor, createSensor, updateSensor, deleteSensor } from '../controllers/Sensor';

const router = express.Router();

router.get('/api/sensor', getSensors);
router.get('/api/sensor/:id', getSensor);
router.post('/api/sensor', createSensor);
router.put('/api/sensor/:id', updateSensor);
router.delete('/api/sensor/:id', deleteSensor);

export default router;