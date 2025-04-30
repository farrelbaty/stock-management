import { createStockMovementUseCase } from "@/lib/usecases/stockUseCases";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const newMovement = await createStockMovementUseCase.save(body);
    return NextResponse.json(newMovement, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
};
