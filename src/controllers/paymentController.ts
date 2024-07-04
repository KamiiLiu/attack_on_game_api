import { Request, Response } from 'express';
import {
  create_mpg_aes_encrypt,
  create_mpg_sha_encrypt,
  create_mpg_aes_decrypt,
} from '@/utils/newEbPay';
import Order from '@/models/OrderModel';
import { PaymentStatus } from '@/enums/OrderStatus';
const config = {
  MerchantID: process.env.MerchantID || '',
  Version: process.env.VERSION || '2.0',
  PayGateWay: process.env.PayGateWay || '',
  ReturnUrl: process.env.ReturnUrl || '',
  NotifyUrl: process.env.NotifyUrl || '',
  FrontEndUrl: process.env.FrontEndUrl || '',
};

export const getPaymetData = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;

    const orderObj = await Order.findOne({ idNumber: orderId }).populate(
      'eventId',
    );
    if (!orderObj) return res.status(404).json({ message: 'Order not found' });

    console.log('orderObj:', orderObj);

    const order = {
      TimeStamp: Date.now(),
      MerchantOrderNo: orderObj.idNumber.replace(/-/g, '_'),
      MerchantID: config.MerchantID,
      Amt: orderObj.payment - orderObj.discount,
      Version: config.Version,
      RespondType: 'JSON',
      ItemDesc: orderObj.eventId.title,
      Email: 'eagle163013@gmail.com',
      ClientBackURL: config.FrontEndUrl,
      NotifyURL: config.NotifyUrl,
      OrderComment: orderObj.notes,
      ReturnURL: config.ReturnUrl,
    };

    const aesEncrypt = create_mpg_aes_encrypt(order);
    const shaEncrypt = create_mpg_sha_encrypt(aesEncrypt);
    console.log('send data:', aesEncrypt, shaEncrypt);

    res.json({
      status: true,
      data: {
        MerchantID: config.MerchantID,
        TradeInfo: aesEncrypt,
        TradeSha: shaEncrypt,
        Version: config.Version,
      },
    });
  } catch (error) {
    console.log('error:', error);
  }
};

export const getReturnData = async (req: Request, res: Response) => {
  try {
    const response = req.body;
    const { Status } = response;
    console.log('Return response:', response);
    if (Status !== 'SUCCESS')
      return res.redirect(`${config.FrontEndUrl}/#/player/admin/checkout/fail`);

    res.redirect(`${config.FrontEndUrl}/#/player/admin/checkout/success`);
  } catch (error) {
    console.log('error:', error);
  }
};

export const getNotifyData = async (req: Request, res: Response) => {
  try {
    const response = req.body;
    console.log('getNotifyData:', 'Body', response);

    const aesEncrypt = create_mpg_sha_encrypt(response.TradeInfo);
    if (aesEncrypt !== response.TradeSha) {
      console.log('訊息與訂單資料不一致', aesEncrypt, response.TradeSha);
      return res.end();
    }

    const aesDecrypt = create_mpg_aes_decrypt(response.TradeInfo);
    console.log('aesDecrypt:', aesDecrypt);

    const order = await Order.findOne({
      idNumber: aesDecrypt.Result.MerchantOrderNo.replace(/_/g, '-'),
    });
    if (!order) {
      console.log('can not find order ');
      return res.end();
    }
    order.paymentStatus = PaymentStatus.COMPLETED;
    order.paymentMethod = aesDecrypt.PaymentType;
    await order.save();

    res.end();
  } catch (error) {
    console.log('error:', error);
    res.end();
  }
};
