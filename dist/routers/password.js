"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_1 = require("../controllers/password");
const router = (0, express_1.Router)();
router.post("/forgot-password", password_1.sendResetPasswordEmail);
exports.default = router;
