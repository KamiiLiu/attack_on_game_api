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
exports.sendEamilValidationCode = exports.getUser = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
function isRequestWithUser(req) {
    return req.user !== undefined;
}
const getUser = (req) => {
    if (!isRequestWithUser(req)) {
        throw new Error('User not found');
    }
    const user = req.user;
    return user;
};
exports.getUser = getUser;
const sendEamilValidationCode = (to, validationToken, frontEndUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const OAuth2 = googleapis_1.google.auth.OAuth2;
    const oauth2Client = new OAuth2({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: 'https://developers.google.com/oauthplayground',
    });
    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
    const { token } = yield oauth2Client.getAccessToken();
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_ADDRESS,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            accessToken: token,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to,
        subject: 'Reset your password',
        text: `Click the link to reset your password: ${frontEndUrl}/${validationToken}`,
    };
    yield transporter.sendMail(mailOptions);
});
exports.sendEamilValidationCode = sendEamilValidationCode;
//# sourceMappingURL=help.js.map