import { NextRequest } from "next/server";
import { AUTH_ENDPOINTS } from "./api/endpoints";
import { AUTH_KEYS } from "./api/models";


export async function middleware(req: NextRequest) {
  
  const authUserID = req.cookies.get(AUTH_KEYS.AUTH_USER_ID);
  const token = req.cookies.get(AUTH_KEYS.TOKEN);

  if (!authUserID || !token) {
    return Response.redirect(new URL(AUTH_ENDPOINTS.LOGIN, req.url))
  }
  
  // Validate Token
  try {
    const res = await fetch(`${process.env.API_URL}${AUTH_ENDPOINTS.LOGIN_WITH_TOKEN}`, {
      method: "GET",
      headers: {
        [AUTH_KEYS.AUTH_USER_ID]: authUserID.value,
        [AUTH_KEYS.TOKEN]: token.value,
      },
    })

    // Invalid token
    if (!res.ok) {
      return Response.redirect(new URL("/login", req.url))
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
    "/friends",
    "/rankings",
    "/stats",
    "/user(/?)(.*)",
  ],
}
