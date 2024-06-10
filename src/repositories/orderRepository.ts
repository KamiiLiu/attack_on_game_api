import OrderModel from '@/models/OrderModel';
// import { OrderDTO } from '@/dto/eventDTO';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { Types } from 'mongoose';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
import { IBaseRepository } from '@/repositories/IBaseRepository';
import { OrderResponseType } from '@/types/OrderResponseType';
import { MONGODB_ERROR_MSG } from '@/types/OtherResponseType';
import _ from 'lodash';
export class OrderRepository implements IBaseRepository<OrderDocument> {
  async findById(id: Types.ObjectId): Promise<OrderDocument | null> {
    try {
      const event = await OrderModel.findById(id);
      if (_.isEmpty(event)) {
        throw new CustomError(
          CustomResponseType.NOT_FOUND,
          OrderResponseType.FAILED_FOUND,
        );
      }
      return event;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }
  findAll(queryParams: any): Promise<OrderDocument[]> {
    throw new Error('Method not implemented.');
  }
  async create(content: Partial<OrderDocument>): Promise<boolean> {
    try {
      const event = new OrderModel(content);
      await event.save();
      return true;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }
  async update(content: Partial<OrderDocument>): Promise<OrderDocument | null> {
    try {
      return await OrderModel.findOneAndUpdate(
        { _id: content.id },
        {
          payment: content.payment,
          discount: content.discount,
          name: content.name,
          phone: content.phone,
          registrationCount: content.registrationCount,
          notes: content.notes,
          paymentStatus: content.paymentStatus,
          paymentMethod: content.paymentMethod,
          updatedAt: content.updatedAt,
        },
        { new: true },
      ).exec();
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }
  delete(id: Types.ObjectId): Promise<OrderDocument | null> {
    throw new Error('Method not implemented.');
  }
}
