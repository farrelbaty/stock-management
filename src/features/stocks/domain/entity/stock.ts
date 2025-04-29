import { MovementType } from "@/lib/utils";

export class StockMovement {
  constructor(
    public id: string,
    public productId: string,
    public type: MovementType,
    public quantity: number,
    public reason: string | null,
    public doneById: string | null
  ) {}
}
