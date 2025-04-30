import { CreateStockMovementUseCase } from "@/features/stocks/application/createStockMovementUseCase";
import { GetStocksUseCase } from "@/features/stocks/application/getStocksUseCase";
import { PrismaStockRepository } from "@/features/stocks/infrastructure/prismaStockRepository";

const stockRepo = new PrismaStockRepository();

export const getStocksUseCase = new GetStocksUseCase(stockRepo);
export const createStockMovementUseCase = new CreateStockMovementUseCase(
  stockRepo
);
