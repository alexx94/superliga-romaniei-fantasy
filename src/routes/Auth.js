import express from 'express';
import { authController } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

export default router;