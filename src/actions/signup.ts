"use server";

import { EMAIL_KEY, NAME_KEY, PASSWORD_KEY, USER_ID_KEY } from "@/config/API";

type FormResponse = { message: string } | null

export default async function signup(prevState: any, formData: FormData): Promise<FormResponse> {
  const signUpInfo = {
    [NAME_KEY]: formData.get(NAME_KEY) ,
    [USER_ID_KEY]: formData.get(USER_ID_KEY),
    [EMAIL_KEY]: formData.get(EMAIL_KEY),
    [PASSWORD_KEY]: formData.get(PASSWORD_KEY),
    [PASSWORD_KEY + "2"]: formData.get(PASSWORD_KEY + "2"),  // Repear Password field
  }

  // Validate data

  return null
}