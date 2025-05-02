import { getSuppliersUseCase } from "@/lib/usecases/suppliersUseCase";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { supplierId: string } }
) => {
  try {
    const { supplierId } = params;
    const supplier = await getSuppliersUseCase.getSupplierUseCase(supplierId);

    return NextResponse.json(supplier, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Erreur serveur",
    });
  }
};
