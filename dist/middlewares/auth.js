"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localAuthenticator = exports.jwtAuthenticator = void 0;
const passport_1 = __importDefault(require("../config/passport"));
const localAuthenticator = (req, res, next) => {
    try {
        passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
            if (err || !user) {
                res.status(401).json({ status: false, message: info.message });
                return;
            }
            req.user = user;
            next();
        })(req, res, next);
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: `Internal Server Error:${error}`,
        });
    }
};
exports.localAuthenticator = localAuthenticator;
const jwtAuthenticator = (req, res, next) => {
    try {
        passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                res.status(401).json({ status: false, message: 'Invalid token' });
                return;
            }
            req.user = user;
            next();
        })(req, res, next);
    }
    catch (error) {
        res.status(500).json({
            status: false,
            message: `Internal Server Error:${error}`,
        });
    }
};
exports.jwtAuthenticator = jwtAuthenticator;
