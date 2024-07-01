"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_mpg_aes_decrypt = exports.create_mpg_sha_encrypt = exports.create_mpg_aes_encrypt = exports.genDataChain = void 0;
const crypto = __importStar(require("crypto"));
// Define the types for the order parameter
// interface Order {
//     TimeStamp: string;
//     MerchantOrderNo: string;
//     Amt: number;
//     ItemDesc: string;
//     Email: string;
// }
// Define the types for the global variables
const HASHKEY = process.env.HASHKEY || '';
const HASHIV = process.env.HASHIV || '';
const needEncodeField = ['ItemDesc', 'Email', 'ReturnURL', 'NotifyURL', 'ClientBackURL'];
// 字串組合
function genDataChain(order) {
    const result = [];
    Object.entries(order).forEach(([key, value]) => {
        // value must be string or number
        if (typeof value !== 'string' && typeof value !== 'number')
            throw new Error(`${key} must be string or number`);
        if (needEncodeField.includes(key)) {
            result.push(`${key}=${encodeURIComponent(value)}`);
            return;
        }
        result.push(`${key}=${value}`);
    });
    return result.join('&');
}
exports.genDataChain = genDataChain;
// 對應文件 P16：使用 aes 加密
// $edata1=bin2hex(openssl_encrypt($data1, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv));
function create_mpg_aes_encrypt(TradeInfo) {
    console.log('TradeInfo:', HASHKEY, HASHIV);
    const encrypt = crypto.createCipheriv('aes-256-cbc', HASHKEY, HASHIV);
    const enc = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex');
    return enc + encrypt.final('hex');
}
exports.create_mpg_aes_encrypt = create_mpg_aes_encrypt;
// 對應文件 P17：使用 sha256 加密
// $hashs="HashKey=".$key."&".$edata1."&HashIV=".$iv;
function create_mpg_sha_encrypt(aesEncrypt) {
    const sha = crypto.createHash('sha256');
    const plainText = `HashKey=${HASHKEY}&${aesEncrypt}&HashIV=${HASHIV}`;
    return sha.update(plainText).digest('hex').toUpperCase();
}
exports.create_mpg_sha_encrypt = create_mpg_sha_encrypt;
// 將 aes 解密
function create_mpg_aes_decrypt(TradeInfo) {
    const decrypt = crypto.createDecipheriv('aes-256-cbc', HASHKEY, HASHIV);
    decrypt.setAutoPadding(false);
    const text = decrypt.update(TradeInfo, 'hex', 'utf8');
    const plainText = text + decrypt.final('utf8');
    const result = plainText.replace(/[\x00-\x20]+/g, '');
    return JSON.parse(result);
}
exports.create_mpg_aes_decrypt = create_mpg_aes_decrypt;
//# sourceMappingURL=newEbPay.js.map