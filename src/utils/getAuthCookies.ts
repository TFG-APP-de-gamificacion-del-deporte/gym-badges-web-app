import { AUTH_KEYS } from "@/api/models";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function getAuthCookies() {
  const authUserID = cookies().get(AUTH_KEYS.AUTH_USER_ID);
  const token = cookies().get(AUTH_KEYS.TOKEN);

  if (!authUserID || !token) {
    redirect("/login");
  }

  return {
    userID: authUserID.value, 
    token: token.value,
  }
}