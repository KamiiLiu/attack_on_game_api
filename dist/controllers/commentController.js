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
exports.createReply = exports.createComment = exports.getComments = void 0;
const express_validator_1 = require("express-validator");
const Comment_1 = require("@/models/Comment");
const help_1 = require("@/utils/help");
const User_1 = __importDefault(require("@/models/User"));
const EventModel_1 = __importDefault(require("@/models/EventModel"));
const Store_1 = require("@/models/Store");
const dayjs_1 = __importDefault(require("@/utils/dayjs"));
const TIME_FORMATTER_1 = __importDefault(require("@/const/TIME_FORMATTER"));
const Player_1 = __importDefault(require("@/models/Player"));
// GET 取得活動留言板資訊 - Create comment & GET comment?
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check validation result
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
        return;
    }
    try {
        const eventId = req.params.eventId;
        const contents = yield Comment_1.Comment.find({ eventId: eventId });
        // check if comment exist
        if (!contents || contents.length == 0) {
            return res
                .status(202)
                .send({ contents: contents, message: 'Comments not create yet!' });
        }
        // check if Event exist
        const eventExist = yield EventModel_1.default.findOne({ idNumber: eventId });
        if (!eventExist) {
            return res.status(404).send({ message: 'Event not found!' });
        }
        res.status(200).send({
            success: true,
            message: '留言板資訊取得成功',
            contents: contents,
        });
    }
    catch (error) {
        res.status(500).send({ message: 'Error creating comment', error: error });
        console.log({ message: 'Error creating comment', error: error });
    }
});
exports.getComments = getComments;
// POST 建立留言 （玩家）
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check validation result
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
        return;
    }
    try {
        const { content } = req.body;
        const author = (0, help_1.getUser)(req)._id;
        const userRole = (0, help_1.getUser)(req).role;
        const eventId = req.params.eventId;
        // check if User exist
        const userExist = yield User_1.default.findById(author);
        if (!userExist) {
            return res.status(404).send({ message: 'User not found!' });
        }
        // check if Player exist
        const playerExist = yield Player_1.default.findOne({ user: author });
        if (!playerExist) {
            return res.status(404).send({ message: 'Player not found!' });
        }
        // check if Event exist
        const eventExist = yield EventModel_1.default.findOne({ idNumber: eventId });
        if (!eventExist) {
            return res.status(404).send({ message: 'Event not found!' });
        }
        // checke if role of user is "player"
        if (userRole !== 'player') {
            return res
                .status(404)
                .send({ message: 'The role of user is not player!' });
        }
        // generate "type" filed
        const typeValue = 'Comment';
        const massageExist = null;
        const storeId = null;
        const player = yield Player_1.default.findOne({ user: author });
        const authorName = player === null || player === void 0 ? void 0 : player.name;
        const avatar = player === null || player === void 0 ? void 0 : player.avatar;
        const comment = yield Comment_1.Comment.create({
            author,
            authorName: authorName,
            avatar: avatar,
            eventId,
            storeId: storeId,
            content,
            createdAt: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
            type: typeValue,
            messageId: massageExist,
        });
        res.status(201).send({ success: true, message: '留言建立成功', comment });
    }
    catch (err) {
        res.status(500).send({ message: 'Error creating comment', error: err });
        console.log({ message: 'Error creating comment', error: err });
    }
});
exports.createComment = createComment;
// POST 回覆留言
const createReply = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check validation result
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
        return;
    }
    try {
        const { content } = req.body;
        const author = (0, help_1.getUser)(req)._id;
        const eventId = req.params.eventId;
        const messageId = req.params.messageId;
        // check if User exist
        const userExist = yield User_1.default.findById(author);
        if (!userExist) {
            return res.status(404).send({ message: 'User not found!' });
        }
        // check if Event exist
        const eventExist = yield EventModel_1.default.findOne({ idNumber: eventId });
        if (!eventExist) {
            return res.status(404).send({ message: 'Event not found!' });
        }
        // check if Store exist
        const storeExist = yield Store_1.Store.findOne({ user: author });
        if (!storeExist) {
            return res.status(404).send({ message: 'Store not found!' });
        }
        // check if role of user is "store"
        const userRole = yield User_1.default.findById(author);
        if ((userRole === null || userRole === void 0 ? void 0 : userRole.role) !== 'store') {
            return res
                .status(404)
                .send({ message: 'The role of user is not store!' });
        }
        // check if message Exist
        const messageExist = yield Comment_1.Comment.findById(messageId);
        if (!messageExist) {
            return res.status(404).send({ message: 'Comment not exist!' });
        }
        // generate "type" filed
        const store = yield Store_1.Store.findOne({ user: author });
        const storeId = store === null || store === void 0 ? void 0 : store._id;
        const authorName = store === null || store === void 0 ? void 0 : store.name;
        const avatar = store === null || store === void 0 ? void 0 : store.avatar;
        const typeValue = 'reply';
        // check the event belong to store or not
        const EventBelongStore = yield EventModel_1.default.find({
            storeId: storeId,
        });
        const EventBelongStoreList = EventBelongStore.map((event) => event.idNumber);
        if (!EventBelongStoreList.includes(eventId)) {
            return res
                .status(404)
                .send({ message: 'The event not belong to your store!' });
        }
        const comment = yield Comment_1.Comment.create({
            author,
            authorName: authorName,
            avatar: avatar,
            eventId,
            storeId: storeId,
            content,
            createdAt: (0, dayjs_1.default)().format(TIME_FORMATTER_1.default),
            type: typeValue,
            messageId: messageId,
        });
        res.status(201).send({ success: true, message: '留言建立成功', comment });
    }
    catch (err) {
        res.status(500).send({ message: 'Error creating comment', error: err });
        console.log({ message: 'Error creating comment', error: err });
    }
});
exports.createReply = createReply;
//# sourceMappingURL=commentController.js.map