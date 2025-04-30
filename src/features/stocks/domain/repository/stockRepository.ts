import { MovementType } from "@/lib/utils";
import { StockMovement } from "../entity/stock";

export interface IStockRepository {
  createStockMovement(
    productId: string,
    quantity: number,
    type: MovementType,
    doneById: string,
    reason: string | null
  ): Promise<StockMovement>;

  retrieveStockMovement(movementId: string): Promise<StockMovement>;
  getAllStockMovements(): Promise<StockMovement[]>;
}
