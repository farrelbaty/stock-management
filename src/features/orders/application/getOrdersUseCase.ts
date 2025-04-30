import { IOrderRepository } from "../domain/repository/orderRepository";

export class GetOrdersUseCase {
  constructor(private orderRepo: IOrderRepository) {}

  async execute() {
    return await this.orderRepo.getAllOrders();
  }
}
