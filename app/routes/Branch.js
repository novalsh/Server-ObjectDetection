import express from 'express';
import { getBranchs, getBranch, createBranch, updateBranch, deleteBranch } from '../controllers/Branch';

const router = express.Router();

router.get('/api/branch', getBranchs);
router.get('/api/branch/:id', getBranch);
router.post('/api/branch', createBranch);
router.put('/api/branch/:id', updateBranch);
router.delete('/api/branch/:id', deleteBranch);

export default router;