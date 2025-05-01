import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProductDTO } from "../domain/DTO/productDTO";
import { Product } from "../domain/entity/Product";
import { IProductRepository } from "../domain/repository/IProductRepository";

export class PrismaProductRepository implements IProductRepository {
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
      return await db.product.count({ where: { id: productId } });
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

  async addProduct(product: ProductDTO): Promise<Product> {
    const {
      name,
      type,
      referenceCode,
      minQuantity,
      quantityInStock,
      expiryDate,
      description,
    } = product;

    try {
      const existingProduct = await db.product.findFirst({
        where: { name },
      });

      if (existingProduct)
        throw new Error("Ce produit est déjà enregistré dans nos données");

      const newProduct = await db.product.create({
        data: {
          name,
          type,
          referenceCode,
          minQuantity,
          quantityInStock: quantityInStock ? quantityInStock : 0,
          expiryDate: expiryDate ? new Date(expiryDate) : null,
          description: description ? description : null,
        },
      });

      return this.toDomain(newProduct);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId: string) {
    try {
      const product = await db.product.findUnique({ where: { id: productId } });
      return product ? this.toDomain(product) : null;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await db.product.findMany();
      return products.map(this.toDomain);
    } catch (error) {
      throw error;
    }
  }

  async getProductByName(name: string): Promise<Product | null> {
    try {
      const product = await db.product.findFirst({ where: { name } });

      return product ? this.toDomain(product) : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(productId: string): Promise<void> {
    try {
      await db.product.delete({ where: { id: productId } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
  async updateMultipleProductQuantities(
    updates: { productId: string; quantity: number }[]
  ): Promise<Product[]> {
    try {
      const transactions = updates.map(({ productId, quantity }) =>
        db.product.update({
          where: { id: productId },
          data: {
            quantityInStock: {
              increment: quantity,
            },
          },
        })
      );

      const updated = await db.$transaction(transactions);
      return updated.map(this.toDomain);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}
