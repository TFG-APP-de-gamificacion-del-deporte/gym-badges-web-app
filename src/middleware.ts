import { NextRequest } from "next/server";
import { API_ENDPOINTS, API_KEYS } from "./config/API";


export async function middleware(req: NextRequest) {
  
  const authUserID = req.cookies.get(API_KEYS.AUTH_USER_ID_KEY);
  const token = req.cookies.get(API_KEYS.TOKEN_KEY);

  if (!authUserID || !token) {
    return Response.redirect(new URL(API_ENDPOINTS.login, req.url))
  }
  
  // Validate Token
  try {
    const res = await fetch(`${process.env.API_URL}${API_ENDPOINTS.loginWithToken}`, {
      method: "GET",
      headers: {
        [API_KEYS.AUTH_USER_ID_KEY]: authUserID.value,
        [API_KEYS.TOKEN_KEY]: token.value,
      },
    })

    // Invalid token
    if (!res.ok) {
      return Response.redirect(new URL(API_ENDPOINTS.login, req.url))
    }

    console.debug("User loged in using token");
    
  } catch (error) {
    // API connection error
    return Response.redirect(new URL("internal-error", req.nextUrl.origin))
  } 
}

// [!] Append any page that requires user to be logged in
export const config = {
  matcher: [
    "/",
    // "/friends",
    "/rankings",
    "/stats",
    "/user(/?)(.*)",
  ]
}
