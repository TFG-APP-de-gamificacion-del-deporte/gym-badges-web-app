"use server";

import { API_ENDPOINTS, PASSWORD_KEY, TOKEN_KEY, USER_ID_KEY } from "@/config/API";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormResponse = { message: string } | null

export default async function login(prevState: any, formData: FormData): Promise<FormResponse> {
  const loginInfo = {
    [USER_ID_KEY]: formData.get('email'),
    [PASSWORD_KEY]: formData.get('password'),
  }

  // Validate data
  if (!loginInfo[USER_ID_KEY] || !loginInfo.password) {
    return { message: "Invalid email or password" }
  }

  try {
    const res = await fetch(`${process.env.API_URL}${API_ENDPOINTS.login}`, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Invalid login
    if (!res.ok) {
      return { message: "Invalid email or password" }
    }

    console.debug("User loged in");

    const oneYear = 365 * 24 * 60 * 60 * 1000;
    // Save UserID cookie
    cookies().set({
      name: USER_ID_KEY,
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
    return { message: "Connection Error" }
  } 

  redirect("/");
}