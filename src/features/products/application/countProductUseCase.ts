import { IProductRepository } from "../domain/repository/IProductRepository";

export class CountProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(productId: string) {
    if (!productId)
      throw new Error("Ce produit n'est pas enregistré dans nos données");
    return await this.productRepo.totalSpecificProduct(productId);
  }
}
