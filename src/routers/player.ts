import { Router } from 'express';
import { createPlayer, getPlayer, updatePlayer } from '../controllers/player';
import {
  createPlayerValidator,
  updatePlayerValidator,
} from '../validators/playerValidator';

const router = Router();

router.post('/', createPlayerValidator, createPlayer);
router.get('/:id', getPlayer);
router.patch('/:id', updatePlayerValidator, updatePlayer);

export default router;
