import * as crypto from 'crypto';

// Define the types for the order parameter
// interface Order {
//     TimeStamp: string;
//     MerchantOrderNo: string;
//     Amt: number;
//     ItemDesc: string;
//     Email: string;
// }

// Define the types for the global variables
const MerchantID: string = process.env.MerchantID || '';
const RespondType: string = process.env.RespondType || 'JSON';
const Version: string = process.env.VERSION || '2.0';
const HASHKEY: string = process.env.HASHKEY || '';
const HASHIV: string = process.env.HASHIV || '';
// 字串組合
export function genDataChain(order: any): string {
    return `MerchantID=${MerchantID}&RespondType=${RespondType}&TimeStamp=${order.TimeStamp
        }&Version=${Version}&MerchantOrderNo=${order.MerchantOrderNo}&Amt=${order.Amt
        }&ItemDesc=${encodeURIComponent(order.ItemDesc)}&Email=${encodeURIComponent(
            order.Email,
        )}&NotifyURL=${encodeURIComponent(order.NotifyURL)}&ClientBackURL=${encodeURIComponent(order.ClientBackURL)}&OrderComment=${encodeURIComponent(order.OrderComment)}
        $ReturnURL=${encodeURIComponent(order.ReturnURL)}`
}

// 對應文件 P16：使用 aes 加密
// $edata1=bin2hex(openssl_encrypt($data1, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv));
export function create_mpg_aes_encrypt(TradeInfo: any): string {
    console.log('TradeInfo:', HASHKEY, HASHIV);
    const encrypt = crypto.createCipheriv('aes-256-cbc', HASHKEY, HASHIV);
    const enc = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex');
    return enc + encrypt.final('hex');
}

// 對應文件 P17：使用 sha256 加密
// $hashs="HashKey=".$key."&".$edata1."&HashIV=".$iv;
export function create_mpg_sha_encrypt(aesEncrypt: string): string {
    const sha = crypto.createHash('sha256');
    const plainText = `HashKey=${HASHKEY}&${aesEncrypt}&HashIV=${HASHIV}`;

    return sha.update(plainText).digest('hex').toUpperCase();
}

// 將 aes 解密
export function create_mpg_aes_decrypt(TradeInfo: string): any {
    const decrypt = crypto.createDecipheriv('aes-256-cbc', HASHKEY, HASHIV);
    decrypt.setAutoPadding(false);
    const text = decrypt.update(TradeInfo, 'hex', 'utf8');
    const plainText = text + decrypt.final('utf8');
    const result = plainText.replace(/[\x00-\x20]+/g, '');
    return JSON.parse(result);
}