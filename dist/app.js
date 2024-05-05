"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
console.log('你安装成功哩QQ');
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
//   });
exports.default = app;
