"use server";

import { API_ENDPOINTS, API_KEYS } from "@/config/API";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormResponse = { message: string } | null

export default async function login(prevState: any, formData: FormData): Promise<FormResponse> {
  const loginInfo = {
    [API_KEYS.USER_ID_KEY]: formData.get(API_KEYS.USER_ID_KEY),
    [API_KEYS.PASSWORD_KEY]: formData.get(API_KEYS.PASSWORD_KEY),
  }

  // Validate data
  if (!loginInfo[API_KEYS.USER_ID_KEY] || !loginInfo[API_KEYS.PASSWORD_KEY]) {
    return { message: "Invalid email or password." };
  }

  // Authenticate
  try {
    const res = await fetch(`${process.env.API_URL}${API_ENDPOINTS.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })

    // Invalid login
    if (!res.ok) {
      return { message: "Invalid email or password." }
    }

    console.debug("User loged in");

    const oneYear = 365 * 24 * 60 * 60 * 1000;
    // Save UserID cookie
    cookies().set({
      name: API_KEYS.AUTH_USER_ID_KEY,
      value: (loginInfo[API_KEYS.USER_ID_KEY] as FormDataEntryValue).toString(),
      maxAge: oneYear,
    });
    // Save Token cookie
    const { token } = await res.json();
    cookies().set({
      name: API_KEYS.TOKEN_KEY,
      value: token,
      maxAge: oneYear,
    });

  } catch (error) {
    // API connection error
    redirect("/internal-error");
  } 

  redirect("/");
}