import { getSession } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!session || !session?.user) {
    if (request.nextUrl.pathname !== "/")
      return NextResponse.redirect(new URL("/", request.url));

    return NextResponse.next();
  }

  const { role } = session.user;

  if (role.name === "GESTIONNAIRE") {
    if (request.nextUrl.pathname !== "/centre-diagnostic")
      return NextResponse.redirect(new URL("/centre-diagnostic", request.url));

    return NextResponse.next();
  } else if (role.name === "FOURNISSEUR") {
    if (request.nextUrl.pathname !== "/fournisseurs")
      return NextResponse.redirect(new URL("/fournisseurs", request.url));

    return NextResponse.next();
  } else if (role.name === "MEDECIN") {
    if (request.nextUrl.pathname !== "/service-hospitalier")
      return NextResponse.redirect(
        new URL("/service-hospitalier", request.url)
      );

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/fournisseurs", "/centre-diagnostic/"],
};
