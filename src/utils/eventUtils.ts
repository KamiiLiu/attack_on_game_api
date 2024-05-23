import { Response } from 'express';
import { IEvent } from '@/interfaces/EventInterface';
import eventEnum from '@/enums/EventStatus';
import dayjs from '@/utils/dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
const now = new Date();
export const handleEventNotFound = (
  event: IEvent | null,
  res: Response,
): boolean => {
  if (!event) {
    res.status(404).json({ message: '沒有這個活動捏！！' });
    return false;
  }
  return true;
};

export const handleEventOffShelf = (event: IEvent, res: Response): boolean => {
  if (!event.isAvailable) {
    res.status(404).json({ message: '這個活動已被商家下架' });
    return false;
  }
  return true;
};

export const findEventStatus = (event: IEvent): string => {
  if (!event.isAvailable) {
    return eventEnum.OFF_SHELF;
  } else if (event.currentParticipantsCount < event.minParticipants) {
    return eventEnum.NOT_FORMED;
  } else if (event.currentParticipantsCount < event.maxParticipants) {
    return eventEnum.FORMED;
  } else if (event.currentParticipantsCount === event.maxParticipants) {
    return eventEnum.FULL;
  } else {
    console.warn('怪怪的');
    return eventEnum.OTHER;
  }
};
