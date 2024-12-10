"use server";

import { FRIENDS_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS, USER_KEYS } from "@/api/models";
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

type FormResponse = { message: string } | null

export async function addFriend(prevState: any, formData: FormData): Promise<FormResponse> {
  // Get own user id
  const { authUserID, token } = getAuthCookies();
  
  // Get friend id
  const friendID = formData.get(USER_KEYS.USER_ID);
  if (!friendID) {
    return { message: "Invalid email or password." };
  }
  
  const url = new URL(`${process.env.API_URL}${FRIENDS_ENDPOINTS.FRIENDS(authUserID)}`)
  const res = await fetch(url, {
    method: "POST",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "friend_id": friendID,
    }),
  })

  if (res.status === 404) {
    return {message: "User not found."} 
  }
  if (res.status === 401) {
    redirect("/login")
  }
  if (!res.ok) {
    redirect("/internal-error");
  }

  revalidatePath("/friends")
  return { message: `Added ${friendID.toString()} as a friend!` }
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
