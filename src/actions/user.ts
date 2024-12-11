"use server";

import { USER_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS, USER_KEYS } from "@/api/constants";
import getAuthCookies from "@/utils/getAuthCookies";
import { redirect } from "next/navigation";
import { User } from "@/api/models";

export async function getUserAction(userID?: string) {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${USER_ENDPOINTS.USER(userID ? userID : authUserID)}`)
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

  return (await res.json()) as User;
}

export async function setWeeklyGoalAction(n: number) {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${USER_ENDPOINTS.USER(authUserID)}`)
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [USER_KEYS.WEEKLY_GOAL]: n,
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