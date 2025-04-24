import { Router } from 'express';
const router = Router();
import { loginUser } from '../controllers/authController.js'; // Import the loginUser function from the controller

// POST /api/login 
router.post('/login', loginUser);

export default router;
