import { PrismaBaseRepository } from "@/features/shared/infrastructure/repositories/PrismaBaseRepository";
import { db } from "@/lib/db";
import { OrderStatus } from "@prisma/client";
import { Order } from "../domain/entity/Order";
import { IOrderRepository } from "../domain/repository/orderRepository";
import { IStockRepository } from "@/features/stocks/domain/repository/stockRepository";
import { IProductRepository } from "@/features/products/domain/repository/IProductRepository";

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
  }
}
