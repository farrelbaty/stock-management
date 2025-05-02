import { loginUserUseCase } from "@/lib/usecases/usersUseCase";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password } = body;
    const loginUser = await loginUserUseCase.save(email, password);

    return NextResponse.json(loginUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
};
