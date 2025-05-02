import { Product } from "../entity/Product";

export interface IProductRepository {
  totalSpecificProduct(productId: string): Promise<number>;

  updateProductQuantity(
    productId: string,
    quantityAdded: number
  ): Promise<Product>;

  addProduct(
    product: Omit<Product, "id">,
    supplierId?: string
  ): Promise<Product>;

  getProductById(productId: string): Promise<Product | null>;

  getAllProducts(): Promise<Product[]>;

  getAllProductsByService(serviceId: string): Promise<Product[]>;
  getAllProductsBySupplier(supplierId: string): Promise<Product[]>;

  getProductByName(name: string): Promise<Product | null>;

  deleteProductById(productId: string): Promise<void>;

  updateMultipleProductQuantities(
    updates: { productId: string; quantity: number }[]
  ): Promise<Product[]>;

  getProductsPurchasedByStructure(): Promise<
    {
      product: Product;
      totalQuantity: number;
      totalSpent: number;
      supplierName?: string;
    }[]
  >;
}
