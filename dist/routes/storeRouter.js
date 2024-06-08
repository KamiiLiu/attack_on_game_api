"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storeValidator_1 = require("../validators/storeValidator");
const validateFileds_1 = require("../middlewares/validateFileds");
const storeValidator_2 = require("../validators/storeValidator");
const storeController_1 = require("../controllers/storeController");
const router = express_1.default.Router();
// create店家資料(假資料)
router.post('/createStrore', storeController_1.createStore);
// GET - 獲取所有店家資料
router.get('/v1/stores', storeController_1.getStores);
// GET - 獲取單一店家資料
router.get('/v1/store/:id', storeController_1.getStoreById);
// PATCH - 修改店家資料(含驗證)
router.patch('/v1/store/:id', (0, validateFileds_1.validateFileds)(storeValidator_2.allowedFileds), storeValidator_1.storValidationRule, storeController_1.updateStore);
// DELETE - 刪除單一店家資料
router.delete('/v1/store/:id', storeController_1.deleteStore);
exports.default = router;
//# sourceMappingURL=storeRouter.js.map