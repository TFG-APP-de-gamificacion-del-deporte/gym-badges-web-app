import { NextRequest } from "next/server";
import { API_ENDPOINTS, TOKEN_KEY, USER_ID_KEY } from "./config/API";

export async function middleware(req: NextRequest) {
  
  const userID = req.cookies.get(USER_ID_KEY);
  const token = req.cookies.get(TOKEN_KEY);

  if (!userID || !token) {
    return Response.redirect(new URL(API_ENDPOINTS.login, req.url))
  }
  
  // Validate Token
  try {
    const res = await fetch(`${process.env.API_URL}${API_ENDPOINTS.loginWithToken}`, {
      method: "GET",
      headers: {
        [USER_ID_KEY]: userID.value,
        [TOKEN_KEY]: token.value,
      },
    })

    // Invalid token
    if (!res.ok) {
      return Response.redirect(new URL(API_ENDPOINTS.login, req.url))
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
