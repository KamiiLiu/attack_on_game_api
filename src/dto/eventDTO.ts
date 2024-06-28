import dayjs from '@/utils/dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
import { BaseDTO } from '@/dto/baseDTO';
import { EventDocument, Ilocation } from '@/interfaces/EventInterface';
import { Types } from 'mongoose';
import TIME_FORMATTER from '@/const/TIME_FORMATTER';
import { generateCustomNanoId } from '@/utils/generateCustomNanoId';
import DEFAULT_ADDRESS from '@/const/DEFAULT_ADDRESS';
export class EventDTO extends BaseDTO {
  readonly storeId!: Types.ObjectId;
  readonly address!: string;
  readonly location: Ilocation;
  readonly isFoodAllowed: boolean;
  readonly description: string;
  readonly title!: string;
  readonly eventStartTime!: string;
  readonly eventEndTime!: string;
  readonly eventImageUrl!: string[];
  readonly registrationStartTime!: string;
  readonly registrationEndTime!: string;
  readonly maxParticipants!: number;
  readonly minParticipants!: number;
  readonly currentParticipantsCount!: number;
  readonly participationFee!: number;
  readonly isPublish!: boolean;
  constructor(dto: Partial<EventDocument>) {
    const dtoWithId = {
      _id: dto._id || new Types.ObjectId(),
      idNumber: dto.idNumber || generateCustomNanoId(),
      createdAt:
        dayjs(dto.createdAt).format(TIME_FORMATTER) ||
        dayjs().format(TIME_FORMATTER),
      updatedAt:
        dayjs(dto.createdAt).format(TIME_FORMATTER) ||
        dayjs().format(TIME_FORMATTER),
    };
    super(dtoWithId);
    this.storeId = dto.storeId ?? new Types.ObjectId();
    this.title = dto.title ?? '';
    this.address = dto.address ?? '';
    this.isFoodAllowed = dto.isFoodAllowed ?? false;
    this.description = dto.description ?? '';
    this.eventStartTime = dto.eventStartTime
      ? dayjs(dto.eventStartTime).format(TIME_FORMATTER)
      : '';
    this.eventEndTime = dto.eventEndTime
      ? dayjs(dto.eventEndTime).format(TIME_FORMATTER)
      : '';
    this.registrationStartTime = dto.registrationStartTime
      ? dayjs(dto.registrationStartTime).format(TIME_FORMATTER)
      : '';
    this.registrationEndTime = dto.registrationEndTime
      ? dayjs(dto.registrationEndTime).format(TIME_FORMATTER)
      : '';
    this.maxParticipants = dto.maxParticipants ?? 0;
    this.minParticipants = dto.minParticipants ?? 0;
    this.currentParticipantsCount = dto.currentParticipantsCount ?? 0;
    this.participationFee = dto.participationFee ?? 0;
    this.eventImageUrl = dto.eventImageUrl ?? [''];
    this.isPublish = dto.isPublish ?? true;
    this.location = dto.location ?? {
      city: DEFAULT_ADDRESS.city,
      district: DEFAULT_ADDRESS.district,
      lng: DEFAULT_ADDRESS.lng,
      lat: DEFAULT_ADDRESS.lat,
    };
  }
  public get availableSeat() {
    return this.maxParticipants - this.currentParticipantsCount;
  }
  public get isRegisterable() {
    const now = dayjs();
    return (
      now.isSameOrBefore(this.registrationEndTime) &&
      now.isSameOrAfter(this.registrationStartTime)
    );
  }
  public toSummaryDTO(): Partial<EventDocument> {
    return {
      title: this.title,
      address: this.address,
      location: this.location,
      eventStartTime: this.eventStartTime,
      eventEndTime: this.eventEndTime,
      maxParticipants: this.maxParticipants,
      minParticipants: this.minParticipants,
      currentParticipantsCount: this.currentParticipantsCount,
      participationFee: this.participationFee,
    };
  }
  public toDetailDTO(): Partial<EventDocument> {
    return {
      idNumber: this.idNumber,
      storeId: this.storeId,
      isFoodAllowed: this.isFoodAllowed,
      description: this.description,
      title: this.title,
      address: this.address,
      location: this.location,
      eventStartTime: this.eventStartTime,
      eventEndTime: this.eventEndTime,
      registrationStartTime: this.registrationStartTime,
      registrationEndTime: this.registrationEndTime,
      maxParticipants: this.maxParticipants,
      minParticipants: this.minParticipants,
      currentParticipantsCount: this.currentParticipantsCount,
      participationFee: this.participationFee,
      eventImageUrl: this.eventImageUrl,
    };
  }
}
