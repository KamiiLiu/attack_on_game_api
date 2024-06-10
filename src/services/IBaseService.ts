import { Types } from 'mongoose';
export interface IBaseService<D> {
  getById(id: Types.ObjectId): Promise<Partial<D>>;
  getAll(queryParams: any): Promise<Partial<D>[]>;
  create(content: any): Promise<boolean>;
  update(id: Types.ObjectId, content: any): Promise<Partial<D> | null>;
  delete(id: Types.ObjectId): Promise<Partial<D> | null>;
}
