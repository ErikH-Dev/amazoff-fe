import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define your protected routes and required roles
const protectedRoutes: { [path: string]: string[] } = {
  "/manage": ["admin", "vendor"],
  // Add more routes and roles as needed
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  


  // Find if the current path is protected
  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (!matchedRoute) {
    return NextResponse.next();
  }

  // Get the user's token (requires NEXTAUTH_SECRET in env)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const userRoles = token?.roles as string[] | undefined;

  // Check if user has at least one required role
  const requiredRoles = protectedRoutes[matchedRoute];
  const hasRole = userRoles?.some((role) => requiredRoles.includes(role));

  if (!hasRole) {
    // Redirect unauthorized users to home (or login)
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Optionally, specify which paths to run middleware on
export const config = {
  matcher: ["/manage/:path*"], // Protect /manage and all subpaths
};