import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/admin", "/login"],
};

export const dynamic = "force-dynamic";

export async function middleware(request: NextRequest) {
  const user = request.cookies.get("user")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  if (!user && !accessToken && request.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (
    (user || accessToken) &&
    request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.searchParams.get("guest")
  ) {
    return Response.redirect(new URL("/", request.url));
  }
}
