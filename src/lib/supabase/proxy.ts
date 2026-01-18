import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";
import { Database } from "./database.types";

export async function updateSession(request: NextRequest) {
    const response = NextResponse.next({ request });

    if (!hasEnvVars) return response;

    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll: () => request.cookies.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Read claims directly from JWT
    const { data: claims } = await supabase.auth.getClaims();
    const isAuthenticated = Boolean(claims?.claims.sub);

    const pathname = request.nextUrl.pathname;

    const authPages = ["/", "/auth/login", "/auth/register"];
    const protectedPages = [
        "/",
        "/exercises",
        "/routines",
        "/dashboard",
        "/profile",
    ];

    // Redirect logged-in users away from auth pages
    if (isAuthenticated && authPages.includes(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = "/routines";
        return NextResponse.redirect(url);
    }

    // Redirect not-logged-in users away from protected pages
    if (!isAuthenticated && protectedPages.includes(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        return NextResponse.redirect(url);
    }

    return response;
}
