"use server";

import { STATS_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS, StatsKeys } from "@/api/models";
import { StatsCardProps } from "@/components/dashboard/stats-card/stats-card";
import getAuthCookies from "@/utils/getAuthCookies";
import { redirect } from "next/navigation";

// ===== Mocked Database =====
let weight = 86;
let fat = 18;

let level = 11
let exp = 230


// TODO Make fetching data non server functions (Not sure anymore)
export async function getStats(): Promise<StatsCardProps> {
  return { weight, fat }
}

export async function getLevel() {
  return level;
}

export async function getExp() {
  return exp;
}

type FormResponse = { message: string } | null

export async function addNewData(title: string, dataKey: StatsKeys, prevState: any, formData: FormData): Promise<FormResponse>  {
  // Get own user id
  const { authUserID, token } = getAuthCookies();

  // Get friend id
  const data = formData.get(dataKey);
  if (!data) {
    return { message: `Invalid ${title}.` };
  }

  const url = new URL(`${process.env.API_URL}${STATS_ENDPOINTS[dataKey](authUserID)}`)
  const res = await fetch(url, {
    method: "POST",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [dataKey]: Number(data),
    }),
  })
  
  if (res.status === 401) {
    redirect("/login")
  }
  if (!res.ok) {
    redirect("/internal-error");
  }

  return { message: `New ${title} added!` }
}

export async function getDataAction(dataKey: StatsKeys) {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${STATS_ENDPOINTS[dataKey](authUserID)}`)
  url.searchParams.append("months", "0");  // Available values : 0, 3, 6, 12. To return all use 0.

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

  return (await res.json()).days;
}