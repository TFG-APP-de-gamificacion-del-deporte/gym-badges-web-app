"use server";

import { AUTH_KEYS } from "@/api/constants";
import { BADGES_ENDPOINTS } from "@/api/endpoints";
import { BadgeTree } from "@/api/models";
import getAuthCookies from "@/utils/getAuthCookies";
import { redirect } from "next/navigation";

export async function getBadges() {
  const { authUserID, token } = getAuthCookies();
  
  const url = new URL(`${process.env.API_URL}${BADGES_ENDPOINTS.GET_BADGES(authUserID)}`)
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

  return (await res.json()) as BadgeTree[];
}