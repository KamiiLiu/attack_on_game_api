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
exports.updateStore = exports.getStoreById = exports.getStores = exports.createStore = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("@/models/User"));
const Store_1 = require("@/models/Store");
const help_1 = require("@/utils/help");
// Create a new store
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check validation result
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
        return;
    }
    try {
        const { name, phone, avatar, address, introduce } = req.body;
        const userId = (0, help_1.getUser)(req)._id;
        // check if user exist
        const userExists = yield User_1.default.findById(userId);
        if (!userExists) {
            return res.status(404).send({ message: 'User not found' });
        }
        // check if the store exist
        const storeExist = yield Store_1.Store.findOne({ user: userId });
        if (storeExist) {
            return res.status(409).send({ message: 'Store already Exist!' });
        }
        // check if role of user is "store"
        const userRole = yield User_1.default.findById(userId);
        if ((userRole === null || userRole === void 0 ? void 0 : userRole.role) !== 'store') {
            return res
                .status(404)
                .send({ message: 'The role of user is not store!' });
        }
        const store = yield Store_1.Store.create({
            name,
            user: userId,
            avatar,
            introduce,
            address,
            phone,
        });
        res.status(201).send({ success: true, message: '註冊成功', store });
        // console.log({ message: 'Store created successfully!!', store })
    }
    catch (error) {
        console.error('Error creating store', error);
        res.status(500).send({ message: 'Error creating store', error });
    }
});
exports.createStore = createStore;
// Read all stores
const getStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield Store_1.Store.find();
        res
            .status(200)
            .send({ success: true, message: '店家列表取得成功', data: stores });
    }
    catch (error) {
        console.error('Error fetching stores', error);
        res.status(500).send({
            message: 'error fetching stores',
            error,
        });
    }
});
exports.getStores = getStores;
// Read store by ID
const getStoreById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeId = req.params.id;
        const store = yield Store_1.Store.findById(storeId);
        // if store is null or undefined
        if (!store) {
            res.status(404).send({ message: 'Store not found!' });
            return;
        }
        res.status(200).send({ status: true, data: store });
    }
    catch (error) {
        console.error('Error fetching store', error);
        res.status(500).send({ message: 'Error fetching store', error });
    }
});
exports.getStoreById = getStoreById;
// Update store data
const updateStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check validation result
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
        return;
    }
    try {
        const storeId = req.params.id;
        const updateData = req.body;
        // find storeId
        const store = yield Store_1.Store.findById(storeId);
        if (!store) {
            res.status(404).send({ message: 'Store not found!' });
            return;
        }
        Object.assign(store, updateData);
        yield store.save({ validateBeforeSave: true });
        res.status(200).send({ status: true, message: '店家', store });
    }
    catch (error) {
        console.error('Error updating store', error);
        res.status(500).send({ message: 'Error updating store', error });
    }
});
exports.updateStore = updateStore;
//# sourceMappingURL=storeController.js.map