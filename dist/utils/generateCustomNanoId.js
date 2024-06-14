"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCustomNanoId = void 0;
const nanoid_1 = require("nanoid");
function generateCustomNanoId() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const nanoid = (0, nanoid_1.customAlphabet)(alphabet, 8);
    return nanoid();
}
exports.generateCustomNanoId = generateCustomNanoId;
//# sourceMappingURL=generateCustomNanoId.js.map