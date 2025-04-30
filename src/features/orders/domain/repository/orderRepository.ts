import { Order } from "../entity/Order";

export interface IOrderRepository {
  totalOrder(): Promise<number>;
  createPurchaseOrder(
    supplierId: string,
    items: { productId: string; quantityOrdered: number }[]
  ): Promise<Order>;

  updateOrder(
    orderId: string,
    items: { productId: string; quantityOrdered: number }[]
  ): Promise<Order>;

  deleteOrder(orderId: string): Promise<void>;

  getSpecificOrder(orderId: string): Promise<Order | null>;
  getAllOrders(): Promise<Order[]>;
}
