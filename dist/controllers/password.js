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
exports.changePassword = exports.resetPassword = exports.sendResetPasswordEmail = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const help_1 = require("@/utils/help");
const help_2 = require("@/utils/help");
const sendResetPasswordEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, fronEndUrl } = req.body;
        const user = yield User_1.default.findOne({ email: to });
        if (!user) {
            res.status(404).json({ status: false, message: 'User not found' });
            return;
        }
        const validateCode = Math.floor(100000 + Math.random() * 900000).toString();
        const validationToken = jsonwebtoken_1.default.sign({ email: user.email, emailCode: validateCode }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.emailCode = validateCode;
        yield user.save();
        yield (0, help_2.sendEamilValidationCode)(to, validationToken, fronEndUrl);
        res.status(200).json({ status: true, message: 'Email sent' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: err.message });
    }
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { validationToken, newPassword } = req.body;
        const decoded = jsonwebtoken_1.default.verify(validationToken, process.env.JWT_SECRET);
        const user = yield User_1.default.findOne({ email: decoded.email });
        if (!user) {
            res.status(404).json({ status: false, message: 'User not found' });
            return;
        }
        if (user.emailCode !== decoded.emailCode) {
            res.status(400).json({ status: false, message: 'Invalid code' });
            return;
        }
        user.password = newPassword;
        user.emailCode = '';
        yield user.save();
        res.status(200).json({ status: true, message: 'Password has be reseted' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: err.message });
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = yield User_1.default.findById((0, help_1.getUser)(req)._id);
        if (!user) {
            res.status(404).json({ status: false, message: 'User not found' });
            return;
        }
        const isPasswordValid = (0, bcrypt_1.compare)(oldPassword, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ status: false, message: 'Invalid password' });
            return;
        }
        user.password = newPassword;
        yield user.save();
        res.status(200).json({ status: true, message: 'Password changed' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: err.message });
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=password.js.map