import { OrderStatus } from "@/lib/utils";

export class Order {
  constructor(
    public id: string,
    public userId: string | null,
    public orderDate: Date,
    public status: OrderStatus,
    public deliveryDate: Date | null
  ) {}
}
