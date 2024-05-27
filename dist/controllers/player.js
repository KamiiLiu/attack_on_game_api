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
exports.updatePlayer = exports.getPlayer = exports.createPlayer = void 0;
const Player_1 = __importDefault(require("../models/Player"));
const User_1 = __importDefault(require("../models/User"));
const express_validator_1 = require("express-validator");
const help_1 = require("../utils/help");
// create player
const createPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ status: false, message: errors.array()[0].msg });
        }
        const { name, phone, avatar, preferGame } = req.body;
        const user = (0, help_1.getUser)(req);
        // check if the user exists
        const userExists = yield User_1.default.findById(user);
        if (!userExists) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }
        // check if the player exists
        const playerExists = yield Player_1.default
            .findOne({ user });
        if (playerExists) {
            return res.status(409).json({ status: false, message: 'Player already exists' });
        }
        const player = yield Player_1.default.create({
            name,
            user: user._id,
            phone,
            avatar,
            preferGame,
        });
        res.status(201).json({ status: true, message: 'Player created' });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.createPlayer = createPlayer;
// get player by id
const getPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ status: false, message: errors.array()[0].msg });
        }
        const player = yield Player_1.default.findOne({ user: req.params.id });
        // check if the player exists
        if (!player) {
            return res.status(404).json({ status: false, message: 'Player not found' });
        }
        res.status(200).json({ status: true, data: player });
    }
    catch (error) {
        res.status(500).json({ status: false, message: error });
    }
});
exports.getPlayer = getPlayer;
// update player
const updatePlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ status: false, message: errors.array()[0].msg });
        }
        // udpate player
        const player = yield Player_1.default.findOneAndUpdate({ user: req.params.id }, req.body, { new: true });
        res.status(200).json({ status: true, message: 'Player updated', data: player });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.updatePlayer = updatePlayer;
