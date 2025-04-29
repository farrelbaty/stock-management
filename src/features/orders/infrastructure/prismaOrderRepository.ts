import { PrismaBaseRepository } from "@/features/shared/infrastructure/repositories/PrismaBaseRepository";
import { db } from "@/lib/db";
import { Order } from "../domain/entity/Order";
import { IOrderRepository } from "../domain/repository/orderRepository";

export class PrismaOrderRepository
  extends PrismaBaseRepository<Order>
  implements IOrderRepository
{
  constructor() {
    super(db.purchaseOrder);
  }

  public toDomain(raw: Order): Order {
    return {
      id: raw.id,
      supplier: raw.supplier,
      orderDate: raw.orderDate,
      deliveryDate: raw.deliveryDate,
      status: raw.status,
      totalAmount: raw.totalAmount,
    };
  }

  async totalOrder(): Promise<number> {
    try {
      return await this.model.count();
    } catch (error) {
      throw error;
    }
  }
}
