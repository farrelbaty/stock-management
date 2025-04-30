import { IOrderRepository } from "../domain/repository/orderRepository";

export class ReceiveOrderUseCase {
  constructor(private orderRepo: IOrderRepository) {}

  async execute(
    orderId: string,
    itemsReceived: {
      productId: string;
      quantityReceived: number;
      unitPrice?: number;
    }[],
    doneById: string
  ) {
    return this.orderRepo.receivePurchaseOrder(
      orderId,
      itemsReceived,
      doneById
    );
  }
}
