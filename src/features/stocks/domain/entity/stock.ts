import { MovementType } from "@/utils/types";

export class StockMovement {
  constructor(
    public id: string,
    public productId: string,
    public type: MovementType,
    public quantity: number,
    public reason?: string,
    public doneById?: string
  ) {}
}
