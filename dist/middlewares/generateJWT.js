"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (req, res, next) => {
    const { user } = req;
    if (!user) {
        res.status(401).json({ status: false, message: 'No user found' });
        next();
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
        status: true,
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        },
    });
    next();
};
exports.default = generateJWT;
