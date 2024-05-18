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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = require("bcrypt");
const userController = {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            try {
                // Check if the user already exists
                const userExists = yield User_1.default.findOne({ email });
                if (userExists) {
                    res.status(409).json({ status: false, message: 'User already exists' });
                    return;
                }
                const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
                yield User_1.default.create({ name, email, password: hashedPassword });
                res.status(200).json({ status: true, menubar: 'User created' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    updated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                const user = yield User_1.default.findById(req.params.id);
                if (!user) {
                    res.status(404).json({ status: false, message: 'User not found' });
                    return;
                }
                yield User_1.default.findByIdAndUpdate(req.params.id, { name });
                res.status(200).json({ status: true, message: 'User updated' });
            }
            catch (error) {
                next(error);
            }
        });
    },
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(req.params.id);
                if (!user) {
                    res.status(404).json({ status: false, message: 'User not found' });
                    return;
                }
                res.status(200).json({ status: true, data: user });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
exports.default = userController;
