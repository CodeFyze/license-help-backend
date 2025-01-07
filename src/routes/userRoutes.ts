import { Router } from 'express';
import { getUsers, getUser, updateUser, deleteUser, assignRole } from '../controllers/userController';

const router = Router();

// Route to get all users
router.get('/', getUsers); // GET /api/users

// Route to get a single user by ID
router.get('/:id', getUser); // GET /api/users/:id

// Route to update user details
router.put('/:id', updateUser); // PUT /api/users/:id

// Route to delete a user
router.delete('/:id', deleteUser); // DELETE /api/users/:id

// Route to assign a role to a user
router.post('/assign-role', assignRole); // POST /api/users/assign-role

export default router;
