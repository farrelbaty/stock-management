import { StockDTO } from "../domain/DTO/stockDTO";
import { IStockRepository } from "../domain/repository/stockRepository";

export class CreateStockMovementUseCase {
  constructor(private readonly stockRepo: IStockRepository) {}

  async save(movement: StockDTO) {
    const { productId, quantity, type, doneById, reason } = movement;

    return await this.stockRepo.createStockMovement(
      productId,
      quantity,
      type,
      doneById,
      reason
    );
  }
}
