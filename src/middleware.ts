import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/admin", "/login"],
};

export const dynamic = "force-dynamic";

export async function middleware(request: NextRequest) {
  const user = request.cookies.get("user")?.value;
  if (!user && request.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/", request.url));
  }
}
