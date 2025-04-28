import { BaseRepository } from "@/features/shared/domain/repositories/baseRepository";
import { Product } from "../entity/Product";

export interface IProductRepository extends BaseRepository<Product> {
  totalSpecificProduct(productId: string): Promise<number>;
}
