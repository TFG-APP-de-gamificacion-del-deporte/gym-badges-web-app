"use server";

import { AUTH_ENDPOINTS } from "@/api/endpoints";
import { AUTH_KEYS, USER_KEYS } from "@/api/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto"
import { logServerAction } from "@/utils/logger";

type FormResponse = { message: string } | null

export default async function signupAction(base64Image: string, prevState: any, formData: FormData): Promise<FormResponse> {

  const signUpInfo = {
    [USER_KEYS.NAME]: formData.get(USER_KEYS.NAME) ,
    [USER_KEYS.USER_ID]: formData.get(USER_KEYS.USER_ID),
    [USER_KEYS.EMAIL]: formData.get(USER_KEYS.EMAIL),
    [USER_KEYS.IMAGE]: base64Image,
    [USER_KEYS.PASSWORD]: formData.get(USER_KEYS.PASSWORD),
    [USER_KEYS.HEIGHT]: Number(formData.get(USER_KEYS.HEIGHT)),
    [USER_KEYS.SEX]: formData.get(USER_KEYS.SEX),
  }

  console.log(formData.get(USER_KEYS.SEX));
  

  // Validate data
  if (signUpInfo[USER_KEYS.PASSWORD] !== formData.get(USER_KEYS.PASSWORD + "2")) {
    return { message: "Passwords not matching" };
  }

  if (
    !signUpInfo[USER_KEYS.NAME]
    || !signUpInfo[USER_KEYS.USER_ID]
    || !signUpInfo[USER_KEYS.EMAIL]
    || !signUpInfo[USER_KEYS.PASSWORD]
    || !signUpInfo[USER_KEYS.IMAGE]
    || !signUpInfo[USER_KEYS.HEIGHT]
    || !signUpInfo[USER_KEYS.SEX]
  ) {
    return { message: "Please fill in all the fields." }
  }

  // Encrypt password
  const hash = crypto.createHash("sha256").update(signUpInfo[USER_KEYS.PASSWORD] as string).digest("hex");
  signUpInfo[USER_KEYS.PASSWORD] = hash;

  // Authenticate
  try {
    const url = new URL(`${process.env.API_URL}${AUTH_ENDPOINTS.SIGNUP}`);
    logServerAction(signupAction.name, url.toString());

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInfo),
    })

    // Already existing user id or email
    if (res.status === 409) {
      return { message: "Already existing username or email." }
    }
    // Unexpected error
    if (!res.ok) {
      console.debug(await res.json());
      redirect("/internal-error");
      // return { message: "Already existing username or email." }
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