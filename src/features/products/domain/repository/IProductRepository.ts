import { BaseRepository } from "@/features/shared/domain/repositories/baseRepository";
import { Product } from "../entity/Product";

export interface IProductRepository extends BaseRepository<Product> {
  addProduct(product: Product): Promise<Product>;
  updateProduct(
    productId: string,
    product: Omit<Product, "id">
  ): Promise<Product>;
  deleteProduct(productId: string): Promise<void>;
  getAllProducts(): Promise<Product[]>;
  getSpecificProduct(productId: string): Promise<Product>;
}
