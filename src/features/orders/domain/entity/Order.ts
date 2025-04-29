import { OrderStatus } from "@/utils/types";

export class Order {
  constructor(
    public id: string,
    public supplier: string,
    public orderDate: Date,
    public status: OrderStatus,
    public deliveryDate?: Date,
    public totalAmount?: number
  ) {}
}
