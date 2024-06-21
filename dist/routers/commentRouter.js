"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// 待更新
router.post('/event/:id/messageBoard', auth_1.jwtAuthenticator, commentController_1.createComment);
exports.default = router;
//# sourceMappingURL=commentRouter.js.map