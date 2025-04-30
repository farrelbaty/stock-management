import { db } from "@/lib/db";
import { MovementType } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { StockMovement } from "../domain/entity/stock";
import { IStockRepository } from "../domain/repository/stockRepository";

export class PrismaStockRepository implements IStockRepository {
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
    type: MovementType,
    doneById: string,
    reason: string | null
  ): Promise<StockMovement> {
    try {
      const stock = await db.stockMovement.create({
        data: {
          productId,
          quantity,
          type,
          doneById,
          reason,
        },
      });

      return this.toDomain(stock);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code == "P2003") {
          throw new Error(
            "Violation de clé étrangère. Fournir l'identifiant requis"
          );
        }
      }
      throw error;
    }
  }

  async retrieveStockMovement(movementId: string): Promise<StockMovement> {
    try {
      const movement = await db.stockMovement.findUnique({
        where: { id: movementId },
      });

      if (!movement) throw new Error("Aucun movement de stock correspondant");

      return this.toDomain(movement);
    } catch (error) {
      throw error;
    }
  }

  async getAllStockMovements() {
    try {
      const stocks = await db.stockMovement.findMany();
      return stocks.map(this.toDomain);
    } catch (error) {
      throw error;
    }
  }
}
