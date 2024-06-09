"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
const CustomResponseType_1 = require("@/enums/CustomResponseType");
const lodash_1 = __importDefault(require("lodash"));
class BaseRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    handleRequest(handler) {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const responseDTO = yield handler(req);
                if (!lodash_1.default.isEmpty(responseDTO.data)) {
                    res.status(this.mapStatusCode(responseDTO.status)).json(responseDTO);
                }
                else {
                    res.status(this.mapStatusCode(responseDTO.status)).json({
                        message: responseDTO.message,
                        status: responseDTO.status,
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    status: CustomResponseType_1.CustomResponseType.SYSTEM_ERROR,
                    message: '服務器錯誤',
                    data: error,
                });
            }
        });
    }
    mapStatusCode(status) {
        switch (status) {
            case CustomResponseType_1.CustomResponseType.SUCCESS:
            case CustomResponseType_1.CustomResponseType.CREATED:
                return 200;
            case CustomResponseType_1.CustomResponseType.BAD_REQUEST:
                return 400;
            case CustomResponseType_1.CustomResponseType.UNAUTHORIZED:
                return 401;
            case CustomResponseType_1.CustomResponseType.FORBIDDEN:
                return 403;
            case CustomResponseType_1.CustomResponseType.NOT_FOUND:
                return 404;
            case CustomResponseType_1.CustomResponseType.CONFLICT:
                return 409;
            case CustomResponseType_1.CustomResponseType.SYSTEM_ERROR:
            default:
                return 500;
        }
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=baseRouter.js.map