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
exports.deleteStore = exports.updateStore = exports.getStoreById = exports.getStores = exports.createStore = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("@/models/User"));
const store_1 = require("@/models/store");
// Create a new store
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check validation result
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json(errors);
        return;
    }
    try {
        const { name, user, phone, avatar, address, introduce } = req.body;
        // check if user exist
        const userExists = yield User_1.default.findById(user);
        if (!userExists) {
            return res.status(404).send({ message: 'User not found' });
        }
        // check if the store exist
        const storeExist = yield store_1.Store.findOne({ user: user });
        if (storeExist) {
            return res.status(409).send({ message: 'Store already Exist!' });
        }
        const store = yield store_1.Store.create({
            name,
            user,
            avatar,
            introduce,
            address,
            phone,
        });
        res.status(201).send({ message: 'Store created successfully!!', store });
        console.log({ message: 'Store created successfully!!', store });
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
        const stores = yield store_1.Store.find();
        res.status(200).send(stores);
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
        const store = yield store_1.Store.findById(storeId);
        // if store is null or undefined
        if (!store) {
            res.status(404).send({ message: 'Store not found!' });
            return;
        }
        res.status(200).send({ store });
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
        const store = yield store_1.Store.findById(storeId);
        if (!store) {
            res.status(404).send({ message: 'Store not found!' });
            return;
        }
        Object.assign(store, updateData);
        yield store.save({ validateBeforeSave: true });
        res.status(200).send(store);
    }
    catch (error) {
        console.error('Error updating store', error);
        res.status(500).send({ message: 'Error updating store', error });
    }
});
exports.updateStore = updateStore;
// Delete store
const deleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield store_1.Store.findById(req.params.id);
        if (!store) {
            res.status(404).send({ message: 'Store not found.' });
            return;
        }
        yield store.deleteOne();
        res.status(200).send({ message: 'Store deleted successfully!', store });
    }
    catch (error) {
        res.status(500).send({ message: 'Error deleting store', error });
    }
});
exports.deleteStore = deleteStore;
//# sourceMappingURL=storeController.js.map