import { PrismaBaseRepository } from "@/features/shared/infrastructure/repositories/PrismaBaseRepository";
import { db } from "@/lib/db";
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
      quantityInStock: raw.quantityInStock ?? 0,
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

  async updateProductQuantity(productId: string, quantityAdded: number) {
    try {
      const updated = await db.product.update({
        where: { id: productId },
        data: {
          quantityInStock: {
            increment: quantityAdded,
          },
        },
      });

      return this.toDomain(updated);
    } catch (error) {
      throw error;
    }
  }

  async addProduct(product: Omit<Product, "id">): Promise<Product> {
    const {
      name,
      type,
      referenceCode,
      minQuantity,
      quantityInStock,
      expiryDate,
      description,
    } = product;
    // const existingProduct = await db.product.findUnique({
    //   where:{referenceCode }
    // })

    try {
      const newProduct = await db.product.create({
        data: {
          name,
          type,
          referenceCode,
          minQuantity,
          quantityInStock: quantityInStock ? quantityInStock : 0,
          expiryDate: expiryDate ? expiryDate : null,
          description: description ? description : null,
        },
      });

      return this.toDomain(newProduct);
    } catch (error) {
      throw error;
    }
  }

  async getProduct(productId: string) {
    try {
      const product = await db.product.findUnique({ where: { id: productId } });
      return product ? this.toDomain(product) : null;
    } catch (error) {
      throw error;
    }
  }
}
