import { NextRequest } from "next/server";


export const TOKEN_KEY = "token";
export const USERNAME_KEY = "username";


export async function middleware(req: NextRequest) {
  
  const username = req.cookies.get(USERNAME_KEY);
  const token = req.cookies.get(TOKEN_KEY);

  if (!username || !token) {
    return Response.redirect(new URL("/login", req.url))
  }
  
  // Validate Token
  try {
    const res = await fetch(`${process.env.API_URL}/login-with-token`, {
      method: "GET",
      headers: {
        [USERNAME_KEY]: username.value,
        [TOKEN_KEY]: token.value,
      },
    })

    // Invalid token
    if (!res.ok) {
      return Response.redirect(new URL("/login", req.url))
    }

    console.debug("User loged in using token");


  } catch (error) {
    // API connection error
    return { message: "Connection Error" }
  } 
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
}
