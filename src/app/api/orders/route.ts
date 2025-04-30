import { createOrderUseCase } from "@/lib/usecases/ordersUseCases";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const newOrder = await createOrderUseCase.save(body);

    return NextResponse.json(newOrder, { status: 500 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
};
