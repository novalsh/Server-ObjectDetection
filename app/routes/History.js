import express from 'express';
import { getHistorys, getHistory} from '../controllers/History';

const router = express.Router();

router.get('/api/history', getHistorys);
router.get('/api/history/:id', getHistory);

export default router;