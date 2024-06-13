import OrderModel from '@/models/OrderModel';
import mongoose from 'mongoose';
import { OrderDocument } from '@/interfaces/OrderInterface';
import { Types } from 'mongoose';
import { CustomResponseType } from '@/enums/CustomResponseType';
import { CustomError } from '@/errors/CustomError';
import { IBaseRepository } from '@/repositories/IBaseRepository';
import { OrderResponseType } from '@/types/OrderResponseType';
import { MONGODB_ERROR_MSG } from '@/types/OtherResponseType';
import _ from 'lodash';
export class OrderRepository implements IBaseRepository<OrderDocument> {
  async findById(id: string): Promise<OrderDocument | null> {
    try {
      const order = await OrderModel.findOne({ idNumber: id });
      console.log(order);
      console.log(id);
      if (_.isEmpty(order)) {
        throw new CustomError(
          CustomResponseType.NOT_FOUND,
          OrderResponseType.FAILED_FOUND,
        );
      }
      return order;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }
  async findAll(queryParams: any): Promise<OrderDocument[]> {
    try {
      const tickets = await OrderModel.find({ ...queryParams });
      if (_.isEmpty(tickets)) {
        throw new CustomError(
          CustomResponseType.NOT_FOUND,
          OrderResponseType.FAILED_FOUND,
        );
      }
      return tickets;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:${error.message || error}`,
      );
    }
  }
  async create(content: Partial<OrderDocument>): Promise<OrderDocument> {
    try {
      const event = new OrderModel(content);
      await event.save();
      return event;
    } catch (error: any) {
      throw new CustomError(
        CustomResponseType.DATABASE_OPERATION_FAILED,
        `${MONGODB_ERROR_MSG}:::::::::::::${error.message || error}`,
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
    console.log(id);
    throw new Error('Method not implemented.');
  }
}
