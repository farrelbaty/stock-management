import { IProductRepository } from "../domain/repository/IProductRepository";

export class CountProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(productId: string) {
    if (!productId) throw new Error("L'identifiant du produit est requis");
    return await this.productRepo.totalSpecificProduct(productId);
  }
}
