"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("module-alias/register");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const DB = `mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster0.2jethgx.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority&appName=Cluster0`;
const app = (0, express_1.default)();
mongoose_1.default
    .connect(DB)
    .then(() => {
    console.log('MongoDB Atlas資料庫連線成功');
})
    .catch((error) => {
    console.log(error);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
exports.default = app;
//TODO:自動更新 MongoDB 的 IP 白名單設置
//# sourceMappingURL=app.js.map