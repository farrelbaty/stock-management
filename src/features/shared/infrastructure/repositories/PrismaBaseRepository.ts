/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseRepository } from "../../domain/repositories/baseRepository";

export abstract class PrismaBaseRepository<T> implements BaseRepository<T> {
  constructor(protected model: any) {}

  public abstract toDomain(raw: any): T;

  async getAll(): Promise<T[]> {
    const results = await this.model.findMany();
    return results.map(this.toDomain);
  }

  async getById(id: string): Promise<T | null> {
    return await this.findOneByField("id", id);
  }

  async create(data: any): Promise<T> {
    const raw = await this.model.create({ data });
    return this.toDomain(raw);
  }

  async update(id: string, data: any): Promise<T> {
    const raw = await this.model.update({ where: { id }, data });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({ where: { id } });
  }

  async findOneByField(field: string, value: any): Promise<T | null> {
    const raw = await this.model.findUnique({ where: { [field]: value } });
    return raw ? this.toDomain(raw) : null;
  }
}
