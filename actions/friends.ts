"use server";

import { FRIENDS_ENDPOINTS, USER_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS, USER_KEYS } from "@/api/constants";
import { Friend } from "@/app/(home)/friends/page";
import getAuthCookies from "@/utils/getAuthCookies";
import { redirect } from "next/navigation";
import { FriendRequest, User } from "@/api/models";
import { logServerAction } from "@/utils/logger";

export async function getFriendsAction(userID?: string, page: number = 1) {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${FRIENDS_ENDPOINTS.FRIENDS(userID ? userID : authUserID)}`)
  url.searchParams.append("page", page.toString())
  logServerAction(getFriendsAction.name, url.toString());

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
    console.debug(await res.json());
    redirect("/internal-error");
  }

  return (await res.json()).friends as Friend[]
}


type FormResponse = { message: string } | null

export async function searchFriendAction(prevState: any, formData: FormData): Promise<FormResponse> {
  const { authUserID, token } = getAuthCookies();

  // Get friend id
  const friendID = formData.get(USER_KEYS.USER_ID);
  if (!friendID) {
    return { message: "Invalid username." };
  }

  const url = new URL(`${process.env.API_URL}${USER_ENDPOINTS.USER(friendID.toString())}`)
  logServerAction(searchFriendAction.name, url.toString());
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
  if (res.status === 404) {
    return { message: "User not found." };
  }
  if (!res.ok) {
    console.debug(await res.json());
    redirect("/internal-error");
  }

  const friend = (await res.json()) as User;

  redirect(`/user/${friend.user_id}`);
}

export async function addFriendAction(friendID: string) {
  // Get own user id
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${FRIENDS_ENDPOINTS.FRIENDS(authUserID)}`)
  logServerAction(addFriendAction.name, url.toString());
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

  if (res.status === 401) {
    redirect("/login")
  }
  if (!res.ok) {
    console.debug(await res.json());
    redirect("/internal-error");
  }
}


export async function deleteFriendAction(friendID: string) {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${FRIENDS_ENDPOINTS.FRIENDS(authUserID)}`)
  logServerAction(deleteFriendAction.name, url.toString());
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
    console.debug(await res.json());
    redirect("/internal-error");
  }
}

export async function getFriendRequestsAction() {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${FRIENDS_ENDPOINTS.FRIEND_REQUESTS(authUserID)}`)
  logServerAction(getFriendRequestsAction.name, url.toString());
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
    console.debug(await res.json());
    redirect("/internal-error");
  }

  return (await res.json()).friend_requests as FriendRequest[]
}
