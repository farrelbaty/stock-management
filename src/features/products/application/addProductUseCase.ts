import { generateReferenceCode } from "@/lib/utils";
import { Product } from "../domain/entity/Product";
import { IProductRepository } from "../domain/repository/IProductRepository";

export class AddProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async save(product: Product) {
    const productExists = await this.productRepo.getProductByName(product.name);

    if (productExists) throw new Error("Ce produit est déjà enregistré");

    const referenceCode = generateReferenceCode();
    const dataToSend = {
      ...product,
      referenceCode,
      minQuantity: Number(product.minQuantity),
      quantityInStock: Number(product.quantityInStock),
    };

    return await this.productRepo.addProduct(dataToSend);
  }
}
