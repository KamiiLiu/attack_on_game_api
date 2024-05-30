"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    // Now you can use `user` as `IUser`.
    const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
        status: true,
        data: {
            user: {
                _id: user._id,
                role: user.role,
                email: user.email,
            },
            token,
        },
    });
    next();
};
exports.default = generateJWT;
//# sourceMappingURL=generateJWT.js.map