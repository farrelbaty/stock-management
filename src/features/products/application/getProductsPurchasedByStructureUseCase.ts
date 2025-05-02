import { IProductRepository } from "../domain/repository/IProductRepository";

export class GetProductPurchasedByStructure {
  constructor(private productRepo: IProductRepository) {}

  async execute() {
    return await this.productRepo.getProductsPurchasedByStructure();
  }
}
