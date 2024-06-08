import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'module-alias/register';
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const DB = `mongodb+srv://${process.env.dbUserName}:${process.env.dbPassword}@cluster0.2jethgx.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority&appName=Cluster0`;
const app: Application = express();

mongoose
  .connect(DB)
  .then(() => {
    console.log('MongoDB Atlas資料庫連線成功');
  })
  .catch((error) => {
    console.log(error);
  });



app.use(express.json());
app.use(cors());
app.use(cors());
export default app;
//TODO:自動更新 MongoDB 的 IP 白名單設置
