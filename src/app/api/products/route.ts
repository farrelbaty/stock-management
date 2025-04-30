import {
  addProductUseCase,
  getAllProductsUseCase,
} from "@/lib/usecases/productUseCase";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await getAllProductsUseCase.execute();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const newProduct = await addProductUseCase.save(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 }
    );
  }
};
