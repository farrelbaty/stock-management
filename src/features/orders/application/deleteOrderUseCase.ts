import { IOrderRepository } from "../domain/repository/orderRepository";

export class DeleteOrderUseCase {
  constructor(private orderRepo: IOrderRepository) {}

  async execute(orderId: string) {
    if (!orderId) throw new Error("L'identifiant de la commande est requis");
    await this.orderRepo.deleteOrder(orderId);
  }
}
