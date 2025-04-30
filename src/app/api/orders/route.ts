import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const orderRepo = new Prisma();
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
