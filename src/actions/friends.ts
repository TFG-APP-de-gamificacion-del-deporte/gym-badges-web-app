"use server";

import { FRIENDS_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS } from "@/api/models";
import { Friend } from "@/app/(home)/friends/page";
import getAuthCookies from "@/utils/getAuthCookies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getFriends() {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${FRIENDS_ENDPOINTS.FRIENDS(authUserID)}`)
  url.searchParams.append("page", "0")

  const res = await fetch(url, {
    method: "GET",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
    },
  })

  if (res.status === 401) {
    redirect("/login")
  }
  if (!res.ok) {
    redirect("/internal-error");
  }

  return (await res.json()).friends as Friend[]
}

export async function deleteFriend(friendID: string) {
  const { authUserID, token } = getAuthCookies();
  
  const url = new URL(`${process.env.API_URL}${FRIENDS_ENDPOINTS.FRIENDS(authUserID)}`)
  
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "friend_id": friendID,
    }),
  })

  if (res.status === 401) {
    redirect("/login")
  }
  if (!res.ok) {
    redirect("/internal-error");
  }

  revalidatePath("/friends")
}
