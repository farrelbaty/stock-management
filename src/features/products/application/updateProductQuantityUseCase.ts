import { IProductRepository } from "../domain/repository/IProductRepository";

export class UpdateProductQuantityUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(productId: string, quantityAdded: number) {
    if (!productId) throw new Error("L'identifiant du produit est requis");
    const existingProduct = await this.productRepo.getProductById(productId);
    if (!existingProduct)
      throw new Error("Le produit n'existe pas dans nos données");

    const updatedProduct = await this.productRepo.updateProductQuantity(
      productId,
      quantityAdded
    );

    return updatedProduct;
  }
}
