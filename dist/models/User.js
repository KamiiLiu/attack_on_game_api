"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const bcrypt_1 = require("bcrypt");
const mongoose_1 = __importStar(require("mongoose"));
var UserRole;
(function (UserRole) {
    UserRole["PLAYER"] = "player";
    UserRole["STORE"] = "store";
})(UserRole || (exports.UserRole = UserRole = {}));
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    emailCode: { type: String, default: '' },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
});
// Add updatedAt field before saving
UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
// hash password before saving
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        user.password = yield (0, bcrypt_1.hash)(user.password, 10);
        next();
    });
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map