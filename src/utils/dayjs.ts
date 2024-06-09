import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/zh-tw';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(updateLocale);
dayjs.locale('zh-tw');
dayjs.updateLocale('zh-tw', {
  weekStart: 0,
});
dayjs.tz.setDefault('Asia/Taipei');

export default dayjs;
