export interface IBaseService<D> {
  getById(id: string): Promise<Partial<D>>;
  getAll(queryParams: any): Promise<Partial<D>[]>;
  create(content: any): Promise<boolean>;
  update(id: string, content: any): Promise<Partial<D> | null>;
  delete(id: string): Promise<Partial<D> | null>;
}
