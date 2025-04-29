import { IOrderRepository } from "../domain/repository/orderRepository";

export class GetOrderUseCase {
  constructor(private orderRepo: IOrderRepository) {}

  async getOrder(orderId: string) {
    if (!orderId) throw new Error("L'identifiant de la commande est requis");

    return await this.orderRepo.getById(orderId);
  }

  async getAllOrders() {
    return await this.orderRepo.getAll();
  }
}
