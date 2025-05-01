import { IOrderRepository } from "../domain/repository/orderRepository";

export class UpdateOrderUseCase {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(
    orderId: string,
    items: { productId: string; quantityOrdered: number }[]
  ) {
    if (!orderId) throw new Error("L'identifiant de la commande est requis");

    const existingOrder = await this.orderRepo.getSpecificOrder(orderId);
    if (!existingOrder)
      throw new Error("Cette commande n'est pas enregistrée dans nos données");

    return await this.orderRepo.updateOrder(orderId, items);
  }
}
