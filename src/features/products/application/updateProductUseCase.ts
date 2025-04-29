import { ProductDTO } from "../domain/DTO/productDTO";
import { IProductRepository } from "../domain/repository/IProductRepository";

export class UpdateProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(productId: string, product: Partial<ProductDTO>) {
    if (!productId) throw new Error("L'identifiant du produit est requis");
    const existingProduct = await this.productRepo.getById(productId);
    if (!existingProduct)
      throw new Error("Le produit n'existe pas dans nos données");

    const updatedProduct = await this.productRepo.update(productId, product);

    return updatedProduct;
  }
}
