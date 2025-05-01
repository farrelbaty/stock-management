import { IProductRepository } from "../domain/repository/IProductRepository";

export class UpdateMultipleProductQuantities {
  constructor(private productRepo: IProductRepository) {}

  async execute(updates: { productId: string; quantity: number }[]) {
    return await this.productRepo.updateMultipleProductQuantities(updates);
  }
}
