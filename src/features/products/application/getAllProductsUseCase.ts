import { IProductRepository } from "../domain/repository/IProductRepository";

export class GetAllProductsUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute() {
    return await this.productRepo.getAll();
  }
}
