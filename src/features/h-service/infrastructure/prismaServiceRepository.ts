import { db } from "@/lib/db";
import { Service } from "../domain/entity/service";
import { IServiceRepository } from "../domain/repository/serviceRepository";

export class PrismaServiceRepository implements IServiceRepository {
  public toDomain(raw: Service): Service {
    return { name: raw.name };
  }

  async createService(name: string) {
    try {
      const newService = await db.service.create({ data: { name } });
      return this.toDomain(newService);
    } catch (error) {
      throw error;
    }
  }

  async getService(name: string) {
    try {
      const service = await db.service.findFirst({ where: { name } });

      return service ? this.toDomain(service) : null;
    } catch (error) {
      throw error;
    }
  }

  async getAllServices(): Promise<Service[]> {
    try {
      const services = await db.service.findMany();
      return services.map(this.toDomain);
    } catch (error) {
      throw error;
    }
  }
}
