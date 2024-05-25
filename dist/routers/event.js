"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = __importDefault(require("@/controllers/eventController"));
//import { jwtAuthenticator } from '../middlewares/auth';
const handleValidationErrors_1 = require("@/middlewares/handleValidationErrors");
const eventValidator_1 = __importDefault(require("@/validators/eventValidator"));
const router = (0, express_1.Router)();
router.get('/', eventController_1.default.getEventList);
router.get('/:eventId', eventController_1.default.getEventDetail);
router.get('/store/:storeId', eventController_1.default.getEventsByShop);
router.patch('/publish', eventController_1.default.publishEvent);
router.patch('/unpublish', eventController_1.default.unpublishEvent);
router.patch('/:eventId', eventController_1.default.updatedEvent); //TODO:還沒驗算，特別是調整人數的部分
router.post('/', eventValidator_1.default, handleValidationErrors_1.handleValidationErrors, eventController_1.default.createEvent);
//TODO: 商家ID要怎麼帶入post還在思考
//TODO: 如何確認currentParticipantsCount人數?應該寫在eventUtils
//TODO: 驗證規則{ jwtAuthenticator }要寫
//TODO: GET和/:shopId都要有數量上的query
//TODO: Geocoding API
//TODO: 上傳圖片的 API(不急)
exports.default = router;
//# sourceMappingURL=event.js.map