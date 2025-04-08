import express from 'express';
import { playerController } from '../controllers/PlayerController.js';
import authorizeRoles from "../middleware/authMiddleware.js";
import cookieParser from "cookie-parser";

const router = express.Router();

// TODO: When having POST, PUT, DELETE, create middleware to check role based auth from their token, and allow only admins 

router.get('/players', authorizeRoles(['admin']), playerController.getPlayers);

export default router;