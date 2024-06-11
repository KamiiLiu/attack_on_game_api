import TicketModel from '@/models/TicketModel';
import { TicketDocument } from '@/interfaces/TicketInterface';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
import { TicketResponseType } from '@/types/TicketResponseType';
import QRCode from 'qrcode';
import { nanoid } from 'nanoid';
import _ from 'lodash';
import { TicketDTO } from '@/dto/ticketDTO';
import { Types } from 'mongoose';
function handleDatabaseError(error: any, message: string): never {
  throw new CustomError(
    CustomResponseType.DATABASE_OPERATION_FAILED,
    `${message}:${error.message || error}`,
  );
}

export class TicketRepository {
  async create(orderIdNumber: string): Promise<boolean> {
    try {
      const idNumber = nanoid();
      const qrCodeUrl = await this.generateQRCode(orderIdNumber, idNumber);
      const ticketDTO = new TicketDTO({ qrCodeUrl, orderIdNumber, idNumber });
      await TicketModel.create(ticketDTO);
      return true;
    } catch (error: any) {
      handleDatabaseError(error, TicketResponseType.FAILED_CREATED);
    }
  }

  async markQrCodeAsUsed(
    content: Partial<TicketDocument>,
  ): Promise<TicketDocument | null> {
    try {
      return await TicketModel.findOneAndUpdate(
        { idNumber: content.idNumber },
        {
          isQrCodeUsed: true,
          updatedAt: new Date().toISOString(),
        },
        { new: true },
      ).exec();
    } catch (error: any) {
      handleDatabaseError(error, TicketResponseType.FAILED_UPDATE);
    }
  }

  async findById(id: string): Promise<TicketDocument | null> {
    try {
      const ticket = await TicketModel.findOne({ idNumber: id });
      if (_.isEmpty(ticket)) {
        throw new CustomError(
          CustomResponseType.NOT_FOUND,
          TicketResponseType.FAILED_FOUND,
        );
      }
      return ticket;
    } catch (error: any) {
      handleDatabaseError(error, TicketResponseType.FAILED_FOUND);
    }
  }

  async findAll(
    orderIdNumber: string,
    playerId: Types.ObjectId,
  ): Promise<TicketDocument[]> {
    try {
      const tickets = await TicketModel.find({ orderIdNumber, playerId });
      if (_.isEmpty(tickets)) {
        throw new CustomError(
          CustomResponseType.NOT_FOUND,
          TicketResponseType.FAILED_FOUND,
        );
      }
      return tickets;
    } catch (error: any) {
      handleDatabaseError(error, TicketResponseType.FAILED_FOUND);
    }
  }

  async generateQRCode(orderId: string, idNumber: string): Promise<string> {
    try {
      const baseUrl = process.env.BASE_URL;
      if (!baseUrl) {
        throw new CustomError(
          CustomResponseType.DATABASE_OPERATION_FAILED,
          `BASE_URL is not defined in environment variables.:${baseUrl}`,
        );
      }
      const url = `${baseUrl}/order/${orderId}?qrCodeId=${idNumber}`;
      return await QRCode.toDataURL(url);
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${TicketResponseType.FAILED_CREATED}:${error.message || error}`,
      );
    }
  }
}
