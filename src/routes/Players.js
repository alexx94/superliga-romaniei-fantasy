import express from 'express';
import { playerController } from '../controllers/PlayerController.js';
import authorizeRoles from "../middleware/authMiddleware.js";
import validatePlayerRequest from '../middleware/playerValidationMiddleware.js';

const router = express.Router();

// TODO: When having POST, PUT, DELETE, create middleware to check role based auth from their token, and allow only admins 

router.get('/players', authorizeRoles(['admin', 'guest']), playerController.getPlayers);
router.post('/players', authorizeRoles(['admin']), validatePlayerRequest, playerController.addPlayer);
router.put('/players/:id', authorizeRoles(['admin']), validatePlayerRequest, playerController.updatePlayer);
router.delete('/players/:id', authorizeRoles(['admin']), playerController.deletePlayer);

export default router;