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
const HASHKEY: string = process.env.HASHKEY || '';
const HASHIV: string = process.env.HASHIV || '';
const needEncodeField: string[] = ['ItemDesc', 'Email', 'ReturnURL', 'NotifyURL', 'ClientBackURL'];
// 字串組合
export function genDataChain(order: any): string {

    const result: string[] = []

    Object.entries(order).forEach(([key, value]) => {

        // value must be string or number
        if (typeof value !== 'string' && typeof value !== 'number') throw new Error(`${key} must be string or number`)
        if (needEncodeField.includes(key)) {
            result.push(`${key}=${encodeURIComponent(value)}`)
            return
        }
        result.push(`${key}=${value}`)
    })

    return result.join('&')

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