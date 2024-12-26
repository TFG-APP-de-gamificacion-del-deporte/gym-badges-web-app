import { AUTH_KEYS } from "@/api/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function getAuthCookies() {
  const authUserID = cookies().get(AUTH_KEYS.AUTH_USER_ID);
  const token = cookies().get(AUTH_KEYS.TOKEN);

  if (!authUserID || !token) {
    redirect("/login");
  }

  return {
    authUserID: authUserID.value, 
    token: token.value,
  }
}