"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateJWT_1 = __importDefault(require("../middlewares/generateJWT"));
const auth_1 = require("../middlewares/auth");
const user_1 = __importDefault(require("@/routers/user"));
const eventRouter_1 = __importDefault(require("@/routers/eventRouter"));
const player_1 = __importDefault(require("@/routers/player"));
const orderRouter_1 = __importDefault(require("@/routers/orderRouter"));
const password_1 = __importDefault(require("@/routers/password"));
const router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.use('/player', auth_1.jwtAuthenticator, player_1.default);
router.post('/login', auth_1.localAuthenticator, generateJWT_1.default);
router.use('/event', eventRouter_1.default);
router.use('/order', orderRouter_1.default);
router.use(password_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map