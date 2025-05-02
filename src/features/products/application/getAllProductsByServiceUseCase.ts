import { IProductRepository } from "../domain/repository/IProductRepository";

export class GetAllProductsByServiceUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(serviceId: string) {
    return await this.productRepo.getAllProductsByService(serviceId);
  }
}
