import { IOrderRepository } from "../domain/repository/orderRepository";

export class GetServicesOrders {
  constructor(private readonly orderRepo: IOrderRepository) {}
  async execute(serviceId: string) {
    if (!serviceId) throw new Error("L'identifiant du service est requis");
    return await this.orderRepo.getServiceOrders(serviceId);
  }
}
