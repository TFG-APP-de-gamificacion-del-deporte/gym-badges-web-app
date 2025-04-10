"use server";

import { STATS_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS, StatsKeys } from "@/api/constants";
import getAuthCookies from "@/utils/getAuthCookies";
import { redirect } from "next/navigation";
import { dataHistory } from "@/api/models";
import { logServerAction } from "@/utils/logger";


// ************************************************************
// WEIGHT AND FAT
// ************************************************************

type FormResponse = { message: string } | null

export async function addNewDataAction(title: string, dataKey: StatsKeys, prevState: any, formData: FormData): Promise<FormResponse>  {
  // Get own user id
  const { authUserID, token } = getAuthCookies();

  // Get data (weight or fat)
  const data = formData.get(dataKey);
  if (!data) {
    return { message: `Invalid ${title}.` };
  }

  const url = new URL(`${process.env.API_URL}${STATS_ENDPOINTS[dataKey](authUserID)}`)
  logServerAction(addNewDataAction.name, url.toString());
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
    console.debug(await res.json());
    redirect("/internal-error");
  }

  return { message: `New ${title} added!` }
}

export async function getDataAction(dataKey: StatsKeys) {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${STATS_ENDPOINTS[dataKey](authUserID)}`)
  url.searchParams.append("months", "0");  // Available values : 0, 3, 6, 12. To return all use 0.
  logServerAction(getDataAction.name, url.toString());

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

  return (await res.json()).days as dataHistory;
}


// ************************************************************
// GYM ATTENDANCES (STREAK)
// ************************************************************

export async function getGymAttendancesAction(month: number, year: number) {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${STATS_ENDPOINTS.streak(authUserID)}`)
  url.searchParams.append("month", month.toString())
  url.searchParams.append("year", year.toString())
  logServerAction(getGymAttendancesAction.name, url.toString());

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

  return (await res.json()).days as string[];
}

export async function addGymAttendanceAction(isoDate: string) {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${STATS_ENDPOINTS.streak(authUserID)}`)
  logServerAction(addGymAttendanceAction.name, url.toString());

  const res = await fetch(url, {
    method: "POST",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: isoDate,
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

export async function deleteGymAttendanceAction(isoDate: string) {
  const { authUserID, token } = getAuthCookies();

  const url = new URL(`${process.env.API_URL}${STATS_ENDPOINTS.streak(authUserID)}`)
  logServerAction(deleteGymAttendanceAction.name, url.toString());

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: isoDate,
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
