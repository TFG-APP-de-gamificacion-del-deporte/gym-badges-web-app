export const USER_KEYS = {
  USER_ID: "user_id",
  PASSWORD: "password",
  NAME: "name",
  EMAIL: "email",
  IMAGE: "image",
  WEIGHT: "weight",
  BODY_FAT: "body_fat",
} as const;

export type UserKey = typeof USER_KEYS[keyof typeof USER_KEYS]


export const AUTH_KEYS = {
  TOKEN: "token",
  AUTH_USER_ID: "auth_user_id",
} as const;

export type AuthKey = typeof AUTH_KEYS[keyof typeof AUTH_KEYS]