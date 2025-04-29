import { BaseRepository } from "@/features/shared/domain/repositories/baseRepository";
import { Order } from "../entity/Order";

export interface IOrderRepository extends BaseRepository<Order> {
  totalOrder(): Promise<number>;
  createPurchaseOrder(
    supplierId: string,
    items: { productId: string; quantityOrdered: number }[]
  ): Promise<Order>;
}
