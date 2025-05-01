import { IProductRepository } from "../domain/repository/IProductRepository";

export class GetProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(productId: string) {
    if (!productId) throw new Error("L'identifiant du produit est requis");

    return await this.productRepo.getProductById(productId);
  }
}
