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
exports.resetPassword = exports.sendResetPasswordEmail = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const sendResetPasswordEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to } = req.body;
        const user = yield User_1.default.findOne({ email: to });
        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }
        const validateCode = Math.floor(100000 + Math.random() * 900000).toString();
        const validationToken = jsonwebtoken_1.default.sign({ email: user.email, emailCode: validateCode }, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.emailCode = validateCode;
        yield user.save();
        yield sendEamilValidationCode(to, validationToken);
        res.status(200).json({ status: true, message: "Email sent" });
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
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }
        if (user.emailCode !== decoded.emailCode) {
            res.status(400).json({ status: false, message: "Invalid code" });
            return;
        }
        console.log(newPassword);
        user.password = yield (0, bcrypt_1.hash)(newPassword, 10);
        user.emailCode = "";
        yield user.save();
        res.status(200).json({ status: true, message: "Code is valid" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: err.message });
    }
});
exports.resetPassword = resetPassword;
const sendEamilValidationCode = (to, validationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const OAuth2 = googleapis_1.google.auth.OAuth2;
    const oauth2Client = new OAuth2({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: "https://developers.google.com/oauthplayground"
    });
    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });
    const { token } = yield oauth2Client.getAccessToken();
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_ADDRESS,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken: token
        }
    });
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to,
        subject: "Reset your password",
        text: `Click the link to reset your password: http://localhost:5173/#/password/getEmailCode/${validationToken}`
    };
    yield transporter.sendMail(mailOptions);
});
