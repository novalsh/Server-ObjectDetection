import express from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/Users';

const router = express.Router();

router.get('/api/acount', getUsers);
router.get('/api/acount/:id', getUser);
router.post('/api/acount', createUser);
router.put('/api/acount/:id', updateUser);
router.delete('/api/acount/:id', deleteUser);

export default router;