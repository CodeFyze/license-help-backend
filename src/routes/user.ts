import { Router } from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController';
import { verifyToken } from '../config/jwt';

const router = Router();

router.get('/', verifyToken, getUsers);          // Admin-only access to view users
router.get('/:id', verifyToken, getUser);       // Admin or user access to view a specific user
router.put('/:id', verifyToken, updateUser);    // Admin or user access to update a user
router.delete('/:id', verifyToken, deleteUser); // Admin-only access to delete users

export default router;
