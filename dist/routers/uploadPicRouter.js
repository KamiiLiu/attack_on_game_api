"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const uploadPicController_1 = require("@/controllers/uploadPicController");
const uploadPicController_2 = require("@/controllers/uploadPicController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
router.post('/:catagory/upload/:id', upload.single('file'), uploadPicController_1.uploadPic);
router.get('/:catagory', uploadPicController_2.getPics);
exports.default = router;
//# sourceMappingURL=uploadPicRouter.js.map