"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPics = exports.uploadPic = void 0;
const firebase_1 = __importDefault(require("../services/firebase"));
const Store_1 = require("@/models/Store");
const Player_1 = __importDefault(require("@/models/Player"));
const EventModel_1 = __importDefault(require("@/models/EventModel"));
const Comment_1 = require("@/models/Comment");
const User_1 = __importDefault(require("@/models/User"));
const bucket = firebase_1.default.storage().bucket();
const uploadPic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (!file) {
            return res
                .status(400)
                .send({ success: false, message: '沒有上傳的檔案' });
        }
        // check forderName validation
        const validcategory = ['player', 'store', 'event'];
        const catagory = req.params.catagory;
        if (validcategory.includes(catagory)) {
            // generate related filename
            const originalname = file.originalname;
            const extension = 'jpg';
            const filename = `${req.params.id}.${extension}`;
            const id = req.params.id;
            const blob = bucket.file(`${req.params.catagory}/${filename}`);
            const blobStream = blob.createWriteStream();
            blobStream.on('finish', () => {
                blob.getSignedUrl({
                    action: 'read', // 權限
                    expires: '12-31-2500', // 網址的有效期限
                }, (err, imgUrl) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        return res
                            .status(500)
                            .send({ message: '取得檔案網址失敗', error: err.message });
                    }
                    if (catagory === 'player') {
                        // check if user exist
                        const userExist = yield User_1.default.findOne({ _id: id });
                        if (!userExist) {
                            return res.status(404).send({ message: 'user not found' });
                        }
                        // update player DB
                        yield Player_1.default.updateOne({ user: id }, { avatar: imgUrl });
                        // update Comment DB
                        const CommentUpdate = yield Comment_1.Comment.updateMany({ author: id }, { $set: { avatar: imgUrl } });
                    }
                    else if (catagory === 'store') {
                        // check if user exist
                        const userExist = yield User_1.default.findOne({ _id: id });
                        if (!userExist) {
                            return res.status(404).send({ message: 'user not found' });
                        }
                        // update store DB
                        yield Store_1.Store.updateOne({ user: id }, { avatar: imgUrl });
                        // update Comment DB
                        const CommentUpdate = yield Comment_1.Comment.updateMany({ author: id }, { $set: { avatar: imgUrl } });
                    }
                    else if (catagory === 'event') {
                        // check if event exist
                        const eventExist = yield EventModel_1.default.findOne({ idNumber: id });
                        if (!eventExist) {
                            return res.status(404).send({ message: 'store not found' });
                        }
                        // update event DB
                        yield EventModel_1.default.updateOne({ idNumber: id }, { eventImageUrl: imgUrl });
                    }
                    res.send({
                        success: true,
                        message: '圖片上傳成功',
                        id: id,
                        imgURL: imgUrl,
                    });
                }));
            });
            blobStream.on('error', (err) => {
                res.status(500).send({
                    success: false,
                    message: '圖片上傳失敗',
                    error: err.message,
                });
            });
            blobStream.end(file.buffer);
        }
        else {
            return res.status(500).send({ message: 'Route輸入格式錯誤' });
        }
    }
    catch (error) { }
});
exports.uploadPic = uploadPic;
// 取得檔案夾內圖片
const validcategory = ['player', 'store', 'event'];
const getPics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (validcategory.includes(req.params.catagory)) {
        const folderPath = `${req.params.catagory}/`;
        bucket
            .getFiles({ prefix: folderPath })
            .then((data) => {
            return data[0];
        })
            .then((files) => __awaiter(void 0, void 0, void 0, function* () {
            const fileList = [];
            for (const file of files) {
                // get file url
                const fileUrl = yield file.getSignedUrl({
                    action: 'read',
                    expires: '12-31-2500',
                });
                fileList.push({
                    fileName: file.name,
                    imgUrl: fileUrl,
                });
            }
            res.send({ fileList });
        }))
            .catch((err) => {
            res.status(500).send({ message: '取得圖片列表失敗' });
        });
    }
    else {
        return res.status(500).send({ message: 'Route輸入格式錯誤' });
    }
});
exports.getPics = getPics;
//# sourceMappingURL=uploadPicController.js.map