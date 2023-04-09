const express = require('express');
const { getBranches, getBranch, createBranch, updateBranch, deleteBranch } = require('../controllers/BranchController');

const router = express.Router();

router.get('/api/branch', getBranches);
router.get('/api/branch/:id', getBranch);
router.post('/api/branch', createBranch);
router.put('/api/branch/:id', updateBranch);
router.delete('/api/branch/:id', deleteBranch);

module.exports = router;
