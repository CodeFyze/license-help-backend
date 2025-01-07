// import { Router } from 'express';
// import { register , login } from '../controllers/authController';

// const router = Router();

// router.post('/register', register);
// router.post('/login', login);

// export default router;

import { Router } from 'express';
import multer from 'multer';
import { register, login , } from '../controllers/authController';
import { getUsers } from '../controllers/userController';

const router = Router();

// Multer configuration
const upload = multer();

// Routes
router.post('/register', upload.none(), register); // Handle `multipart/form-data` for text fields
router.post('/login', login); // No special handling for `login`


export default router;
