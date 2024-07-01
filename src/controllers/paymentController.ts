
import { Request, Response } from 'express';
import { create_mpg_aes_encrypt, create_mpg_sha_encrypt, create_mpg_aes_decrypt } from '@/utils/newEbPay';

/**
 * 
 *  {
    "eventId": "cco7quxx",
    "payment":250,
    "discount": 50,
    "name": "Carol White",
    "phone": "789-012-3456",
    "registrationCount": 1
}
 *
 */

const config = {
    MerchantID: process.env.MerchantID || '',
    Version: process.env.VERSION || '2.0',
    PayGateWay: process.env.PayGateWay || '',
    ReturnUrl: process.env.ReturnUrl || '',
    NotifyUrl: process.env.NotifyUrl || '',
    FrontEndUrl: process.env.FrontEndUrl || '',
}

export const getPaymetData = async (req: Request, res: Response) => {

    try {
        const { eventId, payment } = req.body;

        const order = {
            TimeStamp: Date.now(),
            MerchantOrderNo: Date.now(),
            Amt: payment,
            ItemDesc: eventId,
            Email: "eagle163013@gmail.com"

        }

        const aesEncrypt = create_mpg_aes_encrypt(order)
        const shaEncrypt = create_mpg_sha_encrypt(aesEncrypt);
        console.log('send data:', aesEncrypt, shaEncrypt);
        res.send({
            MerchantID: config.MerchantID,
            TradeInfo: aesEncrypt,
            TradeSha: shaEncrypt,
            Version: config.Version,
            PayGateWay: config.PayGateWay,
            ClientBackURL: config.ReturnUrl,
            NotifyURL: config.NotifyUrl,
        });
    } catch (error) {
        console.log('error:', error);
    }
}


export const getReturnData = async (req: Request, res: Response) => {
    try {
        const response = req.body;

        console.log('response:', response);

        // const thisShaEncrypt = create_mpg_aes_decrypt(response.TradeInfo);

        // 使用 HASH 再次 SHA 加密字串，確保比對一致（確保不正確的請求觸發交易成功）
        // if (!thisShaEncrypt === response.TradeSha) {
        //     console.log('付款失敗：TradeSha 不一致');
        //     return res.end();
        // }

        // 解密交易內容
        // const data = create_mpg_aes_decrypt(response.TradeInfo);
        // console.log('data:', data);

        return res.redirect(config.FrontEndUrl);
    } catch (error) {
        console.log('error:', error);
    }

}


export const getNotifyData = async (req: Request, res: Response) => {
    try {
        const response = req.body;

        console.log('response:', response);
        res.end();
    } catch (error) {
        console.log('error:', error);
        res.end();
    }
}