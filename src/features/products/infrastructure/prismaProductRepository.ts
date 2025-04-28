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

  async addProduct(product: Product): Promise<Product> {
    try {
      return await this.model.create({ data: product });
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(
    productId: string,
    product: Omit<Product, "id">
  ): Promise<Product> {
    try {
      const updatedProduct = await this.model.update({
        where: { id: productId },
        data: product,
      });
      return this.toDomain(updatedProduct);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId: string) {
    try {
      await this.model.delete(productId);
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const products = await this.model.getAll();
      return products.map(this.toDomain);
    } catch (error) {
      throw error;
    }
  }

  async getSpecificProduct(productId: string): Promise<Product> {
    try {
      const product = await this.model.getById(productId);
      return this.toDomain(product);
    } catch (error) {
      throw error;
    }
  }
}
