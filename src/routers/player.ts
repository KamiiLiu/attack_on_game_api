import { Router } from 'express';
import { createPlayer, getPlayer, updatePlayer } from '../controllers/player';
import {
  createPlayerValidator,
  updatePlayerValidator,
} from '../validator/playerValidator';

const router = Router();

router.post('/', createPlayerValidator, createPlayer);
router.get('/:id', getPlayer);
router.put('/:id', updatePlayerValidator, updatePlayer);

export default router;
