import express, { Application } from 'express';
import cors from 'cors';
import 'module-alias/register';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
export default app;
//TODO:自動更新 MongoDB 的 IP 白名單設置
