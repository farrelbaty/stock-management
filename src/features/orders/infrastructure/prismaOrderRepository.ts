import { IProductRepository } from "@/features/products/domain/repository/IProductRepository";
import { PrismaBaseRepository } from "@/features/shared/infrastructure/repositories/PrismaBaseRepository";
import { IStockRepository } from "@/features/stocks/domain/repository/stockRepository";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { Order } from "../domain/entity/Order";
import { IOrderRepository } from "../domain/repository/orderRepository";

export class PrismaOrderRepository
  extends PrismaBaseRepository<Order>
  implements IOrderRepository
{
  constructor(
    private stockRepo: IStockRepository,
    private productRepo: IProductRepository
  ) {
    super(db.purchaseOrder);
  }

  public toDomain(raw: Order): Order {
    return {
      id: raw.id,
      supplierId: raw.supplierId,
      orderDate: raw.orderDate,
      deliveryDate: raw.deliveryDate,
      status: raw.status,
      totalAmount: raw.totalAmount ?? null,
    };
  }

  async totalOrder(): Promise<number> {
    try {
      return await this.model.count();
    } catch (error) {
      throw error;
    }
  }

  async createPurchaseOrder(
    supplierId: string,
    items: { productId: string; quantityOrdered: number }[]
  ): Promise<Order> {
    try {
      const order = await db.purchaseOrder.create({
        data: {
          supplierId,
          status: OrderStatus.PENDING,
          orderDate: new Date(),
          purchaseItems: {
            create: items.map((item) => ({
              product: { connect: { id: item.productId } },
              quantityOrdered: item.quantityOrdered,
            })),
          },
        },
      });

      return this.toDomain(order);
    } catch (error) {
      throw error;
    }
  }

  async receivePurchaseOrder(
    orderId: string,
    itemsReceived: {
      productId: string;
      quantityReceived: number;
      unitPrice?: number;
    }[],
    doneById: string
  ) {
    try {
      const purchaseOrder = await db.purchaseOrder.findUnique({
        where: { id: orderId },
        include: { purchaseItems: true },
      });

      if (!purchaseOrder) throw new Error("Commande introuvable");

      const updatedItems = await Promise.all(
        itemsReceived.map(async (item) => {
          const existingItem = purchaseOrder.purchaseItems.find(
            (pi) => pi.productId === item.productId
          );
          if (!existingItem)
            throw new Error(
              `Produit ${item.productId} non trouvé dans la commande.`
            );

          await db.purchaseItem.update({
            where: { id: existingItem.id },
            data: {
              quantityReceived: item.quantityReceived,
              unitPrice: item.unitPrice,
            },
          });

          await this.stockRepo.createStockMovement(
            item.productId,
            item.quantityReceived,
            doneById,
            "Réception commande"
          );

          await this.productRepo.updateProductQuantity(
            item.productId,
            item.quantityReceived
          );

          return item;
        })
      );

      const isFullyReceived =
        updatedItems.length === purchaseOrder.purchaseItems.length &&
        purchaseOrder.purchaseItems.every(
          (pi) =>
            pi.quantityOrdered ===
            itemsReceived.find((i) => i.productId === pi.productId)
              ?.quantityReceived
        );

      await db.purchaseOrder.update({
        where: { id: orderId },
        data: {
          status: isFullyReceived
            ? OrderStatus.RECEIVED
            : OrderStatus.PARTIALLY_RECEIVED,
          deliveryDate: new Date(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(
    orderId: string,
    items: { productId: string; quantityOrdered: number }[]
  ): Promise<Order> {
    try {
      const existingOrder = await db.purchaseOrder.findUnique({
        where: { id: orderId },
        include: { purchaseItems: true },
      });

      if (!existingOrder) {
        throw new Error("Commande non trouvée");
      }

      const existingItems = existingOrder.purchaseItems;

      // Étape 1 : Créer ou mettre à jour les produits présents dans les nouveaux items
      for (const item of items) {
        const existing = existingItems.find(
          (pi) => pi.productId === item.productId
        );

        if (existing) {
          // Mise à jour si la quantité a changé
          if (existing.quantityOrdered !== item.quantityOrdered) {
            await db.purchaseItem.update({
              where: { id: existing.id },
              data: { quantityOrdered: item.quantityOrdered },
            });
          }
        } else {
          // Nouveau produit ajouté
          await db.purchaseItem.create({
            data: {
              purchaseOrderId: orderId,
              productId: item.productId,
              quantityOrdered: item.quantityOrdered,
            },
          });
        }
      }

      // Étape 2 : Supprimer les produits qui ne sont plus dans la commande
      const newProductIds = items.map((i) => i.productId);

      const itemsToDelete = existingItems.filter(
        (existingItem) => !newProductIds.includes(existingItem.productId)
      );

      for (const item of itemsToDelete) {
        await db.purchaseItem.delete({ where: { id: item.id } });
      }

      const updatedOrder = await db.purchaseOrder.findUniqueOrThrow({
        where: { id: orderId },
      });

      return this.toDomain(updatedOrder);
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(orderId: string) {
    try {
      await this.model.delete(orderId);
    } catch (error) {
      throw error;
    }
  }

  async getSpecificOrder(orderId: string): Promise<Order> {
    try {
      const order = await this.model.getById(orderId);
      return this.toDomain(order);
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders(): Promise<Order[]> {
    try {
      const orders = await this.model.getAll();
      return orders.map(this.toDomain);
    } catch (error) {
      throw error;
    }
  }
}
