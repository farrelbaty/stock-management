import { IProductRepository } from "../domain/repository/IProductRepository";

export class DeleteProductUseCase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(productId: string) {
    if (!productId) throw new Error("L'identifiant du produit est requis");

    const existingProduct = await this.productRepo.delete(productId);
    if (!existingProduct)
      throw new Error("Le produit n'est pas enregistré dans nos données");

    return await this.productRepo.delete(productId);
  }
}
