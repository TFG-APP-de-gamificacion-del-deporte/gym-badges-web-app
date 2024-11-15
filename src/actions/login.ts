"use server";

import { API_ENDPOINTS, AUTH_USER_ID_KEY, PASSWORD_KEY, TOKEN_KEY, USER_ID_KEY } from "@/config/API";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormResponse = { message: string } | null

export default async function login(prevState: any, formData: FormData): Promise<FormResponse> {
  const loginInfo = {
    [USER_ID_KEY]: formData.get(USER_ID_KEY),
    [PASSWORD_KEY]: formData.get(PASSWORD_KEY),
  }

  // Validate data
  if (!loginInfo[USER_ID_KEY] || !loginInfo[PASSWORD_KEY]) {
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
      name: AUTH_USER_ID_KEY,
      value: loginInfo[USER_ID_KEY].toString(),
      maxAge: oneYear,
    });
    // Save Token cookie
    const { token } = await res.json();
    cookies().set({
      name: TOKEN_KEY,
      value: token,
      maxAge: oneYear,
    });

  } catch (error) {
    // API connection error
    redirect("/internal-error");
  } 

  redirect("/");
}