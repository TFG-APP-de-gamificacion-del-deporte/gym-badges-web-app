"use server";

import { AUTH_KEYS, BADGE_KEYS } from "@/api/constants";
import { BADGES_ENDPOINTS } from "@/api/endpoints";
import { BadgeTree } from "@/api/models";
import getAuthCookies from "@/utils/getAuthCookies";
import { logServerAction } from "@/utils/logger";
import { redirect } from "next/navigation";



export async function getBadgesAction() {
  const { authUserID, token } = getAuthCookies();
  
  const url = new URL(`${process.env.API_URL}${BADGES_ENDPOINTS.BADGES(authUserID)}`)
  logServerAction(getBadgesAction.name, url.toString());
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

export async function completeBadgeAction(badgeID: number) {
  const { authUserID, token } = getAuthCookies();
  
  const url = new URL(`${process.env.API_URL}${BADGES_ENDPOINTS.BADGES(authUserID)}`)
  logServerAction(completeBadgeAction.name, url.toString());
  const res = await fetch(url, {
    method: "POST",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [BADGE_KEYS.BADGE_ID]: badgeID,
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

export async function unmarkBadgeAction(badgeID: number) {
  const { authUserID, token } = getAuthCookies();
  
  const url = new URL(`${process.env.API_URL}${BADGES_ENDPOINTS.BADGES(authUserID)}`)
  logServerAction(unmarkBadgeAction.name, url.toString());
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [BADGE_KEYS.BADGE_ID]: badgeID,
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
