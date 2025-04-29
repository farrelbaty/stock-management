import { IOrderRepository } from "../domain/repository/orderRepository";

export class TotalOrderUseCase {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute() {
    return await this.orderRepo.totalOrder();
  }
}
