import { IOrderRepository } from "../domain/repository/orderRepository";

export class CreateOrderUseCase {
  constructor(private orderRepo: IOrderRepository) {}

  async save(
    items: { productId: string; quantityOrdered: number }[],
    supplierId?: string,
    serviceId?: string
  ) {
    if (!supplierId && !serviceId) throw new Error("L'identifiant est requis");
    const newOrder = await this.orderRepo.createPurchaseOrder(
      items,
      supplierId,
      serviceId
    );
    return newOrder;
  }
}
