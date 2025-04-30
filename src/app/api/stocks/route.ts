import {
  createStockMovementUseCase,
  getStocksUseCase,
} from "@/lib/usecases/stockUseCases";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const moves = await getStocksUseCase.getStocks();

    return NextResponse.json(moves, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const newStockMovement = await createStockMovementUseCase.save(body);

    return NextResponse.json(newStockMovement, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
