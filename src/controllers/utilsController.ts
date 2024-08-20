import { Request, Response, NextFunction } from 'express';
import EventModel from '@/models/EventModel';
import _ from 'lodash';
import dayjs from '@/utils/dayjs';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
function createDate(days: number, hour: number) {
  return dayjs()
    .add(days, 'day')
    .hour(hour)
    .minute(0)
    .second(0)
    .millisecond(0)
    .format(TIME_FORMATTER);
}
const utilsController = {
  async freshEvent(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('sss');
      const eventList = await EventModel.find();
      const updates = eventList.map((e) => {
        const numbers = _.sortBy(_.sampleSize(_.range(1, 25), 4));
        const registrationStartTime = createDate(-numbers[0], numbers[0]);
        const registrationEndTime = createDate(numbers[1], numbers[1]);
        const eventStartTime = createDate(numbers[2], numbers[2]);
        const eventEndTime = createDate(numbers[3], numbers[3]);

        return {
          updateOne: {
            filter: { _id: e._id },
            update: {
              registrationStartTime,
              registrationEndTime,
              eventStartTime,
              eventEndTime,
            },
          },
        };
      });

      await EventModel.bulkWrite(updates);

      res.status(200).json({ status: true, menubar: '更新成功' });
    } catch (error) {
      next(error);
    }
  },
};
export default utilsController;
