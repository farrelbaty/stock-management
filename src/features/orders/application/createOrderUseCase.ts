import { Order } from "../domain/entity/Order";
import { IOrderRepository } from "../domain/repository/orderRepository";

export class CreateOrder {
  constructor(private orderRepo: IOrderRepository) {}

  async save(order: Omit<Order, "id">) {
    // Je ferai une validation des données ici avant d'enregistrer la commande

    const newOrder = await this.orderRepo.create(order);
    return newOrder;
  }
}
