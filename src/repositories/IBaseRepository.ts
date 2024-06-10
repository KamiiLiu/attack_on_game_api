// repositories/IBaseRepository.ts
import { Document } from 'mongoose';
export interface IBaseRepository<T extends Document> {
  findById(id: string): Promise<T | null>;
  findAll(queryParams: any): Promise<T[]>;
  create(content: Partial<T>): Promise<boolean>;
  update(content: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
