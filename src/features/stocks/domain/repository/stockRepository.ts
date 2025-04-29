import { StockMovement } from "../entity/stock";

export interface IStockRepository {
  createStockMovement(
    productId: string,
    quantity: number,
    doneById: string,
    reason: string
  ): Promise<StockMovement>;
}
