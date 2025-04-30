import { Product } from "../entity/Product";

export interface IProductRepository {
  totalSpecificProduct(productId: string): Promise<number>;
  updateProductQuantity(
    productId: string,
    quantityAdded: number
  ): Promise<Product>;
  addProduct(product: Omit<Product, "id">): Promise<Product>;
  getProduct(productId: string): Promise<Product | null>;
  getAllProducts(): Promise<Product[]>;
  getProductByName(name: string): Promise<Product | null>;
}
