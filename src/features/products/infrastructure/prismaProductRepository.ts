import { PrismaBaseRepository } from "@/features/shared/infrastructure/repositories/PrismaBaseRepository";
import db from "@/lib/db";
import { Product } from "../domain/entity/Product";
import { IProductRepository } from "../domain/repository/IProductRepository";

export class PrismaProductRepository
  extends PrismaBaseRepository<Product>
  implements IProductRepository
{
  constructor() {
    super(db.product);
  }

  public toDomain(raw: Product): Product {
    return {
      id: raw.id,
      name: raw.name,
      type: raw.type,
      referenceCode: raw.referenceCode,
      quantityInStock: raw.quantityInStock,
      minQuantity: raw.minQuantity,
      expiryDate: raw.expiryDate,
      description: raw.description,
    };
  }

  async totalSpecificProduct(productId: string): Promise<number> {
    try {
      return await this.model.count({ where: { id: productId } });
    } catch (error) {
      throw error;
    }
  }
}
