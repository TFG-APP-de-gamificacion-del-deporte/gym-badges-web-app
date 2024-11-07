"use server";

import { API_ENDPOINTS, EMAIL_KEY, IMAGE_KEY, NAME_KEY, PASSWORD_KEY, TOKEN_KEY, USER_ID_KEY } from "@/config/API";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormResponse = { message: string } | null

export default async function signup(prevState: any, formData: FormData): Promise<FormResponse> {
  // TODO Upload image to a server and get the imageUrl
  
  const signUpInfo = {
    [NAME_KEY]: formData.get(NAME_KEY) ,
    [USER_ID_KEY]: formData.get(USER_ID_KEY),
    [EMAIL_KEY]: formData.get(EMAIL_KEY),
    [PASSWORD_KEY]: formData.get(PASSWORD_KEY),
    // [IMAGE_KEY]: imageUrl,
  }

  // Validate data
  if (signUpInfo[PASSWORD_KEY] != formData.get(PASSWORD_KEY + "2")) {
    return { message: "Passwords not matching" };
  }

  if (
    !signUpInfo[NAME_KEY]
    || !signUpInfo[USER_ID_KEY]
    || !signUpInfo[EMAIL_KEY]
    || !signUpInfo[PASSWORD_KEY]
  ) {
    return { message: "Please fill in all the fields." }
  }

  // Authenticate
  try {
    const res = await fetch(`${process.env.API_URL}${API_ENDPOINTS.signup}`, {
      method: "POST",
      body: JSON.stringify(signUpInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Invalid signup
    if (!res.ok) {
      return { message: "Already existing username or email." }
    }

    console.debug("User signed up");

    const oneYear = 365 * 24 * 60 * 60 * 1000;
    // Save UserID cookie
    cookies().set({
      name: USER_ID_KEY,
      value: signUpInfo[USER_ID_KEY].toString(),
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