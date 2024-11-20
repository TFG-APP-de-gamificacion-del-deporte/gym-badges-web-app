export const API_KEYS = {
  TOKEN_KEY: "token",
  AUTH_USER_ID_KEY: "auth_user_id",
  USER_ID_KEY: "user_id",
  PASSWORD_KEY: "password",
  NAME_KEY: "name",
  EMAIL_KEY: "email",
  IMAGE_KEY: "image",
  WEIGHT_KEY: "weight",
  BODY_FAT_KEY: "body_fat",
} as const

export type ApiKey = typeof API_KEYS[keyof typeof API_KEYS]

export const API_ENDPOINTS = {
  login: "/login",
  loginWithToken: "/login-with-token",
  signup: "/user",
  getUser: "/user",
}