"use server";

import { TOKEN_KEY, USERNAME_KEY } from "@/middleware";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormResponse = { message: string } | null

export default async function login(prevState: any, formData: FormData): Promise<FormResponse> {
  const loginInfo = {
    user: formData.get('email'),
    password: formData.get('password'),
  }

  // Validate data
  if (!loginInfo.user || !loginInfo.password) {
    return { message: "Invalid email or password" }
  }

  try {
    const res = await fetch(`${process.env.API_URL}/login`, {
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
    // Save Username cookie
    cookies().set({
      name: USERNAME_KEY,
      value: loginInfo.user.toString(),
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