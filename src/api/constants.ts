export const USER_KEYS = {
  USER_ID: "user_id",
  BODY_FAT: "body_fat",
  CURRENT_WEEK: "current_week",
  EMAIL: "email",
  EXPERIENCE: "experience",
  IMAGE: "image",
  NAME: "name",
  PASSWORD: "password",
  PREFERENCES: "preferences",
  STREAK: "streak",
  TOP_FEATS: "top_feats",
  WEEKLY_GOAL: "weekly_goal",
  WEIGHT: "weight",
} as const;

export type UserKey = typeof USER_KEYS[keyof typeof USER_KEYS]
export type StatsKeys = typeof USER_KEYS.WEIGHT | typeof USER_KEYS.BODY_FAT | typeof USER_KEYS.STREAK

export const AUTH_KEYS = {
  TOKEN: "token",
  AUTH_USER_ID: "auth_user_id",
} as const;

export type AuthKey = typeof AUTH_KEYS[keyof typeof AUTH_KEYS]