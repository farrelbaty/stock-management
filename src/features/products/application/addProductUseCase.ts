import { Product } from "../domain/entity/Product";
import { IProductRepository } from "../domain/repository/IProductRepository";

export class AddProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async save(product: Product) {
    const existingProduct = await this.productRepo.getById(product.id);

    if (existingProduct)
      throw new Error(
        "Ce produit est déjà enregistré dans notre base de données "
      );

    return await this.productRepo.create(product);
  }
}
