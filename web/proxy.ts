import { NextRequest, NextResponse } from "next/server";
const protectedPaths = [
  "/brands",
  "/products",
  "/categories",
  "/users",
  "/customers",
  "/orders",
  "/profile",
  "/settings",
  "/",
];

const publicPaths = ["/login", "/forgot-password"];
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("access")?.value;

  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith("${path}/")
  );

  if (isProtectedPath && !accessToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (isPublicPath && accessToken) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Ignore:
     * api
     * _next/static
     * _next/image
     * favicon.ico
     * images/files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
