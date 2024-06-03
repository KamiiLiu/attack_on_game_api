import dayjs from '@/utils/dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
import { BaseDTO } from '@/dto/baseDTO';
import { IEvent } from '@/interfaces/EventInterface';
import { Types } from 'mongoose';
import TIME_FOMMATER from '@/const/TIME_FOMMATER';
export class EventDTO extends BaseDTO {
  private readonly _storeId!: Types.ObjectId;
  private readonly _title!: string;
  private readonly _address!: string;
  private readonly _isFoodAllowed: boolean;
  private readonly _description: string;
  private readonly _eventStartTime!: string;
  private readonly _eventEndTime!: string;
  private readonly _registrationStartTime!: string;
  private readonly _registrationEndTime!: string;
  private readonly _maxParticipants!: number;
  private readonly _minParticipants!: number;
  private readonly _currentParticipantsCount!: number;
  private readonly _participationFee!: number;
  private readonly _eventImageUrl!: string[];
  private readonly _isPublish!: boolean;
  constructor(dto: IEvent) {
    super(dto);
    this._storeId = dto.storeId;
    this._title = dto.title;
    this._address = dto.address;
    this._isFoodAllowed = dto.isFoodAllowed;
    this._description = dto.description;
    this._eventStartTime = dayjs(dto.eventStartTime).format(TIME_FOMMATER);
    this._eventEndTime = dayjs(dto.eventEndTime).format(TIME_FOMMATER);
    this._registrationStartTime = dayjs(dto.registrationStartTime).format(
      TIME_FOMMATER,
    );
    this._registrationEndTime = dayjs(dto.registrationEndTime).format(
      TIME_FOMMATER,
    );
    this._maxParticipants = dto.maxParticipants;
    this._minParticipants = dto.minParticipants;
    this._currentParticipantsCount = dto.currentParticipantsCount;
    this._participationFee = dto.participationFee;
    this._eventImageUrl = dto.eventImageUrl;
    this._isPublish = dto.isPublish || true;
  }
  public get isRegisterable() {
    const now = dayjs();
    return (
      now.isSameOrBefore(this._eventEndTime) &&
      now.isSameOrAfter(this._eventStartTime)
    );
  }
  public get storeId() {
    return this._storeId;
  }
  public get isPublish() {
    return this._isPublish;
  }
  public get id() {
    return this._id;
  }
  public get title() {
    return this._title;
  }
  public get address() {
    return this._address;
  }
  public get isFoodAllowed() {
    return this._isFoodAllowed;
  }
  public get description() {
    return this._description;
  }
  public get eventStartTime() {
    return this._eventStartTime;
  }
  public get eventEndTime() {
    return this._eventEndTime;
  }
  public get registrationStartTime() {
    return this._registrationStartTime;
  }
  public get registrationEndTime() {
    return this._registrationEndTime;
  }
  public get maxParticipants() {
    return this._maxParticipants;
  }
  public get minParticipants() {
    return this._minParticipants;
  }
  public get currentParticipantsCount() {
    return this._currentParticipantsCount;
  }
  public get participationFee() {
    return this._participationFee;
  }
  public get eventImageUrl() {
    return this._eventImageUrl;
  }

  public toSummaryDTO(): Partial<EventDTO> {
    return {
      title: this.title,
      address: this.address,
      eventStartTime: this.eventStartTime,
      eventEndTime: this.eventEndTime,
      maxParticipants: this.maxParticipants,
      minParticipants: this.minParticipants,
      currentParticipantsCount: this.currentParticipantsCount,
      participationFee: this.participationFee,
    };
  }
  public toDetailDTO(): Partial<EventDTO> {
    return {
      _id: this.id,
      storeId: this._storeId,
      isFoodAllowed: this._isFoodAllowed,
      description: this._description,
      title: this.title,
      address: this.address,
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
