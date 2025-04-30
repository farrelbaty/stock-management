import { getAllServicesUseCase } from "@/lib/usecases/servicesUseCase";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const services = await getAllServicesUseCase.execute();
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
};
