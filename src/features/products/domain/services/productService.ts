import { IProductRepository } from "../repository/IProductRepository";

export class ProductService {
  constructor(private productRepo: IProductRepository) {}
  async isEnoughQuantity(productId: string, quantity: number) {
    const product = await this.productRepo.getProductById(productId);

    if (!product) throw new Error("Ce produit n'est pas enregistré");

    const { quantityInStock } = product;

    return quantityInStock < quantity ? false : true;
  }
}
