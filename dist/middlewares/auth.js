"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localAuthenticator = exports.jwtAuthenticator = void 0;
const passport_1 = __importDefault(require("../config/passport"));
const localAuthenticator = (req, res, next) => {
    passport_1.default.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            res.status(401).json({ status: false, message: 'No user found' });
            return;
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.localAuthenticator = localAuthenticator;
const jwtAuthenticator = (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.status(401).json({ status: false, message: 'It is wrong token ' });
            return;
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.jwtAuthenticator = jwtAuthenticator;
