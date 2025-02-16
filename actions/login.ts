"use server";

import { AUTH_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS, USER_KEYS } from "@/api/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto"

type FormResponse = { message: string } | null

export default async function loginAction(prevState: any, formData: FormData): Promise<FormResponse> {
  const loginInfo = {
    [USER_KEYS.USER_ID]: formData.get(USER_KEYS.USER_ID),
    [USER_KEYS.PASSWORD]: formData.get(USER_KEYS.PASSWORD),
  }

  // Validate data
  if (!loginInfo[USER_KEYS.USER_ID] || !loginInfo[USER_KEYS.PASSWORD]) {
    return { message: "Invalid username or password." };
  }

  // Encrypt password
  const hash = crypto.createHash("sha256").update(loginInfo[USER_KEYS.PASSWORD] as string).digest("hex");
  loginInfo[USER_KEYS.PASSWORD] = hash;

  // Authenticate
  try {
    const res = await fetch(`${process.env.API_URL}${AUTH_ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })

    // Invalid login
    if (!res.ok) {
      return { message: "Invalid username or password." }
    }

    console.debug("User loged in");

    const oneYear = 365 * 24 * 60 * 60 * 1000;
    // Save UserID cookie
    cookies().set({
      name: AUTH_KEYS.AUTH_USER_ID,
      value: (loginInfo[USER_KEYS.USER_ID] as FormDataEntryValue).toString(),
      maxAge: oneYear,
    });
    // Save Token cookie
    const { token } = await res.json();
    cookies().set({
      name: AUTH_KEYS.TOKEN,
      value: token,
      maxAge: oneYear,
    });

  } catch (error) {
    // API connection error
    redirect("/internal-error");
  } 

  redirect("/");
}

export async function logoutAction() {
  cookies().delete(AUTH_KEYS.AUTH_USER_ID);
  cookies().delete(AUTH_KEYS.TOKEN);
  redirect("/login")
}