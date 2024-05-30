import { Router } from 'express';
import { createPlayer, getPlayer, updatePlayer } from '../controllers/player';
import { jwtAuthenticator } from '../middlewares/auth';
import {
  createPlayerValidator,
  updatePlayerValidator,
} from '../validator/playerValidator';

const router = Router();

router.post('/', jwtAuthenticator, createPlayerValidator, createPlayer);
router.get('/:id', jwtAuthenticator, getPlayer);
router.put('/:id', jwtAuthenticator, updatePlayerValidator, updatePlayer);

export default router;
