import { USER_KEYS } from "./constants";

export const AUTH_ENDPOINTS = {
  LOGIN: "/login",
  LOGIN_WITH_TOKEN: "/login-with-token",
  SIGNUP: "/user",  // POST at /user
} as const;

export const USER_ENDPOINTS = {
  USER: (userID: string) => `/user/${userID}` as const,
} as const;

export const BADGES_ENDPOINTS = {
  BADGES: (userID: string) => `/badges/${userID}` as const,
} as const;

export const FRIENDS_ENDPOINTS = {
  FRIENDS: (userID: string) => `/friends/${userID}` as const,
} as const;

export const STATS_ENDPOINTS = {
  [USER_KEYS.WEIGHT]:   (userID: string) => `/stats/weight/${userID}` as const,
  [USER_KEYS.BODY_FAT]: (userID: string) => `/stats/fat/${userID}` as const,
  [USER_KEYS.STREAK]:   (userID: string) => `/stats/streak/${userID}` as const,
} as const;

export const RANKINGS_ENDPOINTS = {
  GLOBAL: (userID: string) => `/rankings/global/${userID}` as const,
  FRIENDS: (userID: string) => `/rankings/friends/${userID}` as const,
} as const;