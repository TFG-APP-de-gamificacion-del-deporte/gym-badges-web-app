"use server";

import { AUTH_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS, USER_KEYS } from "@/api/models";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormResponse = { message: string } | null

export default async function signup(prevState: any, formData: FormData): Promise<FormResponse> {
  // TODO Upload image to a server and get the imageUrl
  
  const signUpInfo = {
    [USER_KEYS.NAME]: formData.get(USER_KEYS.NAME) ,
    [USER_KEYS.USER_ID]: formData.get(USER_KEYS.USER_ID),
    [USER_KEYS.EMAIL]: formData.get(USER_KEYS.EMAIL),
    [USER_KEYS.PASSWORD]: formData.get(USER_KEYS.PASSWORD),
    // [IMAGE_KEY]: imageUrl,
  }

  // Validate data
  if (signUpInfo[USER_KEYS.PASSWORD] !== formData.get(USER_KEYS.PASSWORD + "2")) {
    return { message: "Passwords not matching" };
  }

  if (
    !signUpInfo[USER_KEYS.NAME]
    || !signUpInfo[USER_KEYS.USER_ID]
    || !signUpInfo[USER_KEYS.EMAIL]
    || !signUpInfo[USER_KEYS.PASSWORD]
  ) {
    return { message: "Please fill in all the fields." }
  }

  // Authenticate
  try {
    const res = await fetch(`${process.env.API_URL}${AUTH_ENDPOINTS.SIGNUP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInfo),
    })

    // Invalid signup
    if (!res.ok) {
      return { message: "Already existing username or email." }
    }

    console.debug("User signed up");

    const oneYear = 365 * 24 * 60 * 60 * 1000;
    // Save UserID cookie
    cookies().set({
      name: AUTH_KEYS.AUTH_USER_ID,
      value: (signUpInfo[USER_KEYS.USER_ID] as FormDataEntryValue).toString(),
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