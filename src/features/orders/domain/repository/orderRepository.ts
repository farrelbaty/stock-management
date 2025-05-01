import { Order } from "../entity/Order";

export interface IOrderRepository {
  totalOrder(): Promise<number>;
  createPurchaseOrder(
    items: { productId: string; quantityOrdered: number }[],
    supplierId?: string,
    serviceId?: string
  ): Promise<Order>;

  updateOrder(
    orderId: string,
    items: { productId: string; quantityOrdered: number }[]
  ): Promise<Order>;

  deleteOrder(orderId: string): Promise<void>;

  getSpecificOrder(orderId: string): Promise<Order | null>;
  getAllOrders(): Promise<Order[]>;
  receivePurchaseOrder(
    orderId: string,
    itemsReceived: {
      productId: string;
      quantityReceived: number;
      unitPrice?: number;
    }[],
    doneById: string
  ): Promise<Order>;

  getServiceOrders(serviceId: string): Promise<Order[]>;
}
