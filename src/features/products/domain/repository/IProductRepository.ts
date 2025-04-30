import { BaseRepository } from "@/features/shared/domain/repositories/baseRepository";
import { Product } from "../entity/Product";

export interface IProductRepository extends BaseRepository<Product> {
  totalSpecificProduct(productId: string): Promise<number>;
  updateProductQuantity(
    productId: string,
    quantityAdded: number
  ): Promise<Product>;
  addProduct(product: Omit<Product, "id">): Promise<Product>;
  getProduct(productId: string): Promise<Product | null>;
}
