"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generateJWT_1 = __importDefault(require("../middlewares/generateJWT"));
const auth_1 = require("../middlewares/auth");
const user_1 = __importDefault(require("@/routers/user"));
const eventRouter_1 = __importDefault(require("@/routers/eventRouter"));
const player_1 = __importDefault(require("@/routers/player"));
const storeRouter_1 = __importDefault(require("@/routers/storeRouter"));
const orderRouter_1 = __importDefault(require("@/routers/orderRouter"));
const myEventRouter_1 = __importDefault(require("@/routers/myEventRouter"));
const password_1 = __importDefault(require("@/routers/password"));
const commentRouter_1 = __importDefault(require("../routers/commentRouter"));
const review_1 = __importDefault(require("@/routers/review"));
const payment_1 = __importDefault(require("@/routers/payment"));
const router = (0, express_1.Router)();
router.use('/user', user_1.default);
router.use('/player', auth_1.jwtAuthenticator, player_1.default);
router.post('/login', auth_1.localAuthenticator, generateJWT_1.default);
router.use('/event', eventRouter_1.default);
router.use('/myevent', myEventRouter_1.default);
router.use('/order', orderRouter_1.default);
router.use(password_1.default);
router.use('/store', storeRouter_1.default);
router.use('/', commentRouter_1.default);
router.use('/review', review_1.default);
router.use('/payment', payment_1.default);
router.post('/return', (req, res) => {
    try {
        console.log('return:', req.body);
        res.send(`${process.env.FrontEndUrl}/#/player/admin/checkout/success`);
    }
    catch (error) {
        console.log('error:', error);
        res.send('error');
    }
});
router.post('/notify', (req, res) => {
    try {
        console.log('notify:', req.body);
        res.send('notify');
    }
    catch (error) {
        console.log('error:', error);
        res.send('error');
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map