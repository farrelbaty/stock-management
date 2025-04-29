import { PrismaBaseRepository } from "@/features/shared/infrastructure/repositories/PrismaBaseRepository";
import { db } from "@/lib/db";
import { MovementType } from "@prisma/client";
import { StockMovement } from "../domain/entity/stock";
import { IStockRepository } from "../domain/repository/stockRepository";

export class PrismaStockRepository
  extends PrismaBaseRepository<StockMovement>
  implements IStockRepository
{
  constructor() {
    super(db.stockMovement);
  }

  public toDomain(raw: StockMovement): StockMovement {
    return {
      id: raw.id,
      productId: raw.productId,
      quantity: raw.quantity,
      type: raw.type,
      reason: raw.reason,
      doneById: raw.doneById,
    };
  }

  async createStockMovement(
    productId: string,
    quantity: number,
    doneById: string,
    reason: string
  ): Promise<StockMovement> {
    try {
      const stock = await db.stockMovement.create({
        data: {
          productId,
          quantity,
          type: MovementType.ENTREE,
          doneById,
          reason,
        },
      });

      return this.toDomain(stock);
    } catch (error) {
      throw error;
    }
  }
}
