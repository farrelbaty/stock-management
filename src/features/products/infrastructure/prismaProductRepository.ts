import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProductDTO } from "../domain/DTO/productDTO";
import { Product } from "../domain/entity/Product";
import { IProductRepository } from "../domain/repository/IProductRepository";

export class PrismaProductRepository implements IProductRepository {
  public toDomain(
    raw: Product & { supplier: { id: string; name: string } | null }
  ): Product & { supplier: { id: string; name: string } | null } {
    return {
      id: raw.id,
      name: raw.name,
      type: raw.type,
      referenceCode: raw.referenceCode,
      quantityInStock: raw.quantityInStock ?? 0,
      minQuantity: raw.minQuantity,
      expiryDate: raw.expiryDate,
      description: raw.description,
      supplier: raw.supplier,
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
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
            },
          },
        },
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

  async addProduct(
    product: ProductDTO & { supplierId?: string }
  ): Promise<Product> {
    const {
      name,
      type,
      referenceCode,
      minQuantity,
      quantityInStock,
      expiryDate,
      description,
      supplierId,
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
          ...(supplierId && { supplier: { connect: { id: supplierId } } }),
        },
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return this.toDomain(newProduct);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId: string) {
    try {
      const product = await db.product.findUnique({
        where: { id: productId },
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return product ? this.toDomain(product) : null;
    } catch (error) {
      throw error;
    }
  }

  async getAllProductsByService(serviceId: string): Promise<Product[]> {
    try {
      const productsByService = await db.product.findMany({
        where: { serviceId },
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return productsByService.map(this.toDomain);
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await db.product.findMany({
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return products.map(this.toDomain);
    } catch (error) {
      throw error;
    }
  }

  async getProductByName(name: string): Promise<Product | null> {
    try {
      const product = await db.product.findFirst({
        where: { name },
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

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
          include: {
            supplier: {
              select: {
                id: true,
                name: true,
              },
            },
          },
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

  async getProductsPurchasedByStructure() {
    try {
      const orders = await db.purchaseOrder.findMany({
        where: {
          status: {
            in: ["RECEIVED", "PARTIALLY_RECEIVED"],
          },
        },
        include: {
          purchaseItems: {
            include: {
              product: {
                include: {
                  supplier: true,
                },
              },
            },
          },
        },
      });

      const productMap = new Map<
        string,
        {
          product: Product;
          totalQuantity: number;
          totalSpent: number;
          supplierName?: string;
        }
      >();

      for (const order of orders) {
        for (const item of order.purchaseItems) {
          const productId = item.productId;
          const existing = productMap.get(productId);

          const quantity = item.quantityOrdered;
          const price = item.unitPrice ?? 0;
          const amount = quantity * price;

          if (existing) {
            existing.totalQuantity += quantity;
            existing.totalSpent += amount;
          } else {
            productMap.set(productId, {
              product: this.toDomain(item.product),
              totalQuantity: quantity,
              totalSpent: amount,
              supplierName: item.product.supplier?.name || "Inconnu",
            });
          }
        }
      }

      return Array.from(productMap.values());
    } catch (error) {
      throw error;
    }
  }

  async getAllProductsBySupplier(supplierId: string): Promise<Product[]> {
    try {
      const productsBySupplier = await db.product.findMany({
        where: { supplierId },
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return productsBySupplier.map(this.toDomain);
    } catch (error) {
      throw error;
    }
  }
}
