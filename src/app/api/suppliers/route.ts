import { NextResponse } from "next/server";

export const GET = async () => {
  try {
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
