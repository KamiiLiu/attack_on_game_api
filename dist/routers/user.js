"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/', userController_1.default.create);
router.put('/:id', auth_1.jwtAuthenticator, userController_1.default.updated);
router.get('/:id', auth_1.jwtAuthenticator, userController_1.default.getById);
exports.default = router;
