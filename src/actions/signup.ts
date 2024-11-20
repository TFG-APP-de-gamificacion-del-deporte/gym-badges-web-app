"use server";

import { API_ENDPOINTS, API_KEYS } from "@/config/API";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormResponse = { message: string } | null

export default async function signup(prevState: any, formData: FormData): Promise<FormResponse> {
  // TODO Upload image to a server and get the imageUrl
  
  const signUpInfo = {
    [API_KEYS.NAME_KEY]: formData.get(API_KEYS.NAME_KEY) ,
    [API_KEYS.USER_ID_KEY]: formData.get(API_KEYS.USER_ID_KEY),
    [API_KEYS.EMAIL_KEY]: formData.get(API_KEYS.EMAIL_KEY),
    [API_KEYS.PASSWORD_KEY]: formData.get(API_KEYS.PASSWORD_KEY),
    // [IMAGE_KEY]: imageUrl,
  }

  // Validate data
  if (signUpInfo[API_KEYS.PASSWORD_KEY] != formData.get(API_KEYS.PASSWORD_KEY + "2")) {
    return { message: "Passwords not matching" };
  }

  if (
    !signUpInfo[API_KEYS.NAME_KEY]
    || !signUpInfo[API_KEYS.USER_ID_KEY]
    || !signUpInfo[API_KEYS.EMAIL_KEY]
    || !signUpInfo[API_KEYS.PASSWORD_KEY]
  ) {
    return { message: "Please fill in all the fields." }
  }

  // Authenticate
  try {
    const res = await fetch(`${process.env.API_URL}${API_ENDPOINTS.signup}`, {
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
      name: API_KEYS.AUTH_USER_ID_KEY,
      value: (signUpInfo[API_KEYS.USER_ID_KEY] as FormDataEntryValue).toString(),
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