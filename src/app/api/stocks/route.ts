// import { GetProductUseCase } from "@/features/products/application/getProductUseCase";
// import { PrismaProductRepository } from "@/features/products/infrastructure/prismaProductRepository";
import { CreateStockMovementUseCase } from "@/features/stocks/application/createStockMovementUseCase";
import { GetStocksUseCase } from "@/features/stocks/application/getStocksUseCase";
import { PrismaStockRepository } from "@/features/stocks/infrastructure/prismaStockRepository";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const stockRepo = new PrismaStockRepository();
    // const productRepo = new PrismaProductRepository();
    const getStocksUseCase = new GetStocksUseCase(stockRepo);
    // const getProductUseCase = new GetProductUseCase(productRepo);
    const moves = await getStocksUseCase.getStocks();
    // const product = getProductUseCase.execute();

    return NextResponse.json(moves, { status: 200 });
  } catch (error) {
    throw error;
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const stockRepo = new PrismaStockRepository();
    const createStockMovement = new CreateStockMovementUseCase(stockRepo);

    const newStockMovement = await createStockMovement.save(body);

    return NextResponse.json(newStockMovement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
