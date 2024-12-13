"use server";

import { USER_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS, USER_KEYS } from "@/api/constants";
import getAuthCookies from "@/utils/getAuthCookies";
import { redirect } from "next/navigation";
import { BadgeInfo, Preference, TopFeat, User } from "@/api/models";
import { revalidatePath } from "next/cache";

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
    redirect("/login") // TODO Fix redirect
  }
  if (res.status === 404) {
    redirect("/not-found-error", )
  }
  if (!res.ok) {
    console.debug(await res.json());
    redirect("/internal-error");
  }

  revalidatePath("/user/[user_id]", "page");
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

type FormResponse = { message: string } | null

export async function editProfileAction(prevState: any, formData: FormData): Promise<FormResponse> {
  const { authUserID, token } = getAuthCookies();

  // Get form info
  const name = formData.get(USER_KEYS.NAME);
  const email = formData.get(USER_KEYS.EMAIL);
  const image = formData.get(USER_KEYS.IMAGE);
  if (name === null) {
    return { message: "Invalid name." };
  }
  if (email === null) {
    return { message: "Invalid email." };
  }
  if (image === null) {
    return { message: "Invalid image." };
  }

  const url = new URL(`${process.env.API_URL}${USER_ENDPOINTS.USER(authUserID)}`)
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      [AUTH_KEYS.AUTH_USER_ID]: authUserID,
      [AUTH_KEYS.TOKEN]: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [USER_KEYS.NAME]: name,
      [USER_KEYS.EMAIL]: email,
      // TODO [USER_KEYS.IMAGE]: image,
    }),
  })
  
  if (res.status === 401) {
    redirect("/login")
  }
  if (!res.ok) {
    console.debug(await res.json());
    redirect("/internal-error");
  }

  return { message: "Profile updated." }
}

export async function setTopFeatsAction (topFeatIDs: number[]) {
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
      [USER_KEYS.TOP_FEATS]: topFeatIDs,
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

export async function addTopFeatActrion (topFeatID: number) {
  const user = await getUserAction();

  const ids = user.top_feats.map(tf => tf.id);
  ids.push(topFeatID)

  setTopFeatsAction(ids)

  revalidatePath("/user/[user_id]", "page");
}

export async function setPreferenceAction(preferences: Preference) {
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
      [USER_KEYS.PREFERENCES]: [preferences],
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
