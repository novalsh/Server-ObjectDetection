const express = require('express');
const { getBranches, getBranch, createBranch, updateBranch, deleteBranch } = require('../controllers/BranchController');
const { protect } = require('../controllers/AuthController');


const router = express.Router();

router.get('/api/branch',protect, getBranches);
router.get('/api/branch/:id',protect, getBranch);
router.post('/api/branch', protect, createBranch);
router.put('/api/branch/:id', protect, updateBranch);
router.delete('/api/branch/:id', protect, deleteBranch);

module.exports = router;
