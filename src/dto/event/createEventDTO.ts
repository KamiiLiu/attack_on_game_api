import { BaseDTO } from '@/dto/baseDTO';
import { IEvent } from '@/interfaces/EventInterface';
import { Types } from 'mongoose';
export class CreateEventDTO extends BaseDTO {
  private readonly storeId!: Types.ObjectId;
  private readonly title!: string;
  private readonly description!: string;
  private readonly address!: string;
  private readonly eventStartTime!: Date;
  private readonly eventEndTime!: Date;
  private readonly registrationStartTime!: Date;
  private readonly registrationEndTime!: Date;
  private readonly isFoodAllowed!: boolean;
  private readonly maxParticipants!: number;
  private readonly minParticipants!: number;
  private readonly currentParticipantsCount!: number;
  private readonly participationFee!: number;
  private readonly eventImageUrl!: string[];
  private readonly isPublish!: boolean;
  constructor(dto: IEvent) {
    super(dto);
    this.storeId = dto.storeId;
    this.title = dto.title;
    this.description = dto.description;
    this.address = dto.address;
    this.eventStartTime = dto.eventStartTime;
    this.eventEndTime = dto.eventEndTime;
    this.registrationStartTime = dto.registrationStartTime;
    this.registrationEndTime = dto.registrationEndTime;
    this.isFoodAllowed = dto.isFoodAllowed;
    this.maxParticipants = dto.maxParticipants;
    this.minParticipants = dto.minParticipants;
    this.participationFee = dto.participationFee;
    this.eventImageUrl = dto.eventImageUrl;
  }
}
