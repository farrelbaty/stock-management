import { Service } from "../entity/service";

export interface IServiceRepository {
  createService(name: string): Promise<Service>;
  getService(name: string): Promise<Service | null>;
  getAllServices(): Promise<Service[]>;
}
