"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const player_1 = require("../controllers/player");
const playerValidator_1 = require("../validators/playerValidator");
const router = (0, express_1.Router)();
router.post('/', playerValidator_1.createPlayerValidator, player_1.createPlayer);
router.get('/:id', player_1.getPlayer);
router.patch('/:id', playerValidator_1.updatePlayerValidator, player_1.updatePlayer);
exports.default = router;
//# sourceMappingURL=player.js.map