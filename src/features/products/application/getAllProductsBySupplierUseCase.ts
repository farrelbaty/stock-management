import { IProductRepository } from "../domain/repository/IProductRepository";

export class GetAllProductsBySupplierUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(supplierId: string) {
    return await this.productRepo.getAllProductsBySupplier(supplierId);
  }
}
