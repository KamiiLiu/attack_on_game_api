"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_1 = require("../controllers/password");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/sendResetEmail", password_1.sendResetPasswordEmail);
router.post("/reset-password", password_1.resetPassword);
router.post("/change-password", auth_1.jwtAuthenticator, password_1.changePassword);
exports.default = router;
//# sourceMappingURL=password.js.map