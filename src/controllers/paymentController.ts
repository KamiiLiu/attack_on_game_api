
import { Request, Response } from 'express';
import { create_mpg_aes_encrypt, create_mpg_sha_encrypt, create_mpg_aes_decrypt } from '@/utils/newEbPay';
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
            Email: "eagle163013@gmail.com",
            ClientBackURL: config.FrontEndUrl,
            NotifyURL: config.NotifyUrl,
            OrderComment: "Payment test",
            ReturnURL: config.ReturnUrl,
        }

        const aesEncrypt = create_mpg_aes_encrypt(order)
        const shaEncrypt = create_mpg_sha_encrypt(aesEncrypt);
        console.log('send data:', aesEncrypt, shaEncrypt);
        res.send({
            MerchantID: config.MerchantID,
            TradeInfo: aesEncrypt,
            TradeSha: shaEncrypt,
            Version: config.Version,
        });
    } catch (error) {
        console.log('error:', error);
    }
}


export const getReturnData = async (req: Request, res: Response) => {
    try {
        const response = req.body;
        const { Status } = response
        console.log('Return response:', response);
        if (Status !== 'SUCCESS') return res.redirect(`${config.FrontEndUrl}/#/player/admin/checkout/fail`);

        res.redirect(`${config.FrontEndUrl}/#/player/admin/checkout/success`);
    } catch (error) {
        console.log('error:', error);
    }

}


export const getNotifyData = async (req: Request, res: Response) => {
    try {
        const response = req.body;
        console.log('getNotifyData:', "Body", response);

        const aesEncrypt = create_mpg_aes_encrypt(response.TradeInfo);
        if (aesEncrypt !== response.TradeSha) {
            console.log('訊息與訂單資料不一致');
            return res.end();
        }

        const aesDecrypt = create_mpg_aes_decrypt(response.TradeInfo);

        console.log('aesDecrypt:', aesDecrypt);

        res.end();
    } catch (error) {

        res.end();
    }
}