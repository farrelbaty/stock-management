import { OrderStatus } from "@/lib/utils";

export class Order {
  constructor(
    public id: string,
    public supplierId: string | null,
    public orderDate: Date,
    public status: OrderStatus,
    public deliveryDate: Date | null,
    public totalAmount: number | null
  ) {}
}
