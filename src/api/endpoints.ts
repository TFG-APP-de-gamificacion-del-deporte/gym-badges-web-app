export const AUTH_ENDPOINTS = {
  LOGIN: "/login",
  LOGIN_WITH_TOKEN: "/login-with-token",
  SIGNUP: "/user",  // POST at /user
} as const;

export const USER_ENDPOINTS = {
  GET_USER: (userID: string) => `/user/${userID}` as const,
} as const;

export const BADGES_ENDPOINTS = {
  GET_BADGES: (userID: string) => `/badges/${userID}` as const,
} as const;

export const FRIENDS_ENDPOINTS = {
  GET_FRIENDS: (userID: string) => `/friends/${userID}` as const,
} as const;

export const STATS_ENDPOINTS = {
  GET_WEIGHT_HISTORY: (userID: string) => `/stats/weight/${userID}` as const,
  GET_FAT_HISTORY:    (userID: string) => `/stats/fat/${userID}` as const,
  GET_STREAK_HISTORY: (userID: string) => `/stats/streak/${userID}` as const,
} as const;