import { Router } from 'express';
import EventController from '@/controllers/eventController';
//import { jwtAuthenticator } from '../middlewares/auth';
import { handleValidationErrors } from '@/middlewares/handleValidationErrors';
import eventValidator from '@/validators/eventValidator';
const router = Router();
router.get('/', EventController.getEventList);
router.get('/:eventId', EventController.getEventDetail);
router.get('/store/:storeId', EventController.getEventsByShop);
router.patch('/publish', EventController.publishEvent);
router.patch('/unpublish', EventController.unpublishEvent);
router.patch('/:eventId', EventController.updatedEvent); //TODO:還沒驗算，特別是調整人數的部分
router.post(
  '/',
  eventValidator,
  handleValidationErrors,
  EventController.createEvent,
);

//TODO: 商家ID要怎麼帶入post還在思考
//TODO: 如何確認currentParticipantsCount人數?應該寫在eventUtils
//TODO: 驗證規則{ jwtAuthenticator }要寫
//TODO: GET和/:shopId都要有數量上的query
//TODO: Geocoding API
//TODO: 上傳圖片的 API(不急)
export default router;
