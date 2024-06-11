import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'module-alias/register';
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
export default app;
//TODO:自動更新 MongoDB 的 IP 白名單設置
