import { getSuppliersUseCase } from "@/lib/usecases/suppliersUseCase";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const suppliers = await getSuppliersUseCase.getAllSuppliersUseCase();
    return NextResponse.json(suppliers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erreur serveur inconnue",
      },
      { status: 500 }
    );
  }
};
