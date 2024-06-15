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
// 待更新
router.post('/', storeController_1.createStore);
router.get('/', storeController_1.getStores);
router.get('/:id', storeController_1.getStoreById);
router.patch('/:id', (0, validateFileds_1.validateFileds)(storeValidator_2.allowedFileds), storeValidator_1.storValidationRule, storeController_1.updateStore);
// 待更新
router.delete('/:id', storeController_1.deleteStore);
exports.default = router;
//# sourceMappingURL=storeRouter.js.map