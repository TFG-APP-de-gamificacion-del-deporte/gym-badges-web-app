import { USER_KEYS } from "./constants";

export interface TopFeat {
  id: number,
  name: string
  image: string,
  description: string,
}

export interface BadgeInfo {
  id: number,
  name: string,
  image: string,
  description: string,
  achieved?: boolean,
}

export type Preference = {
  on: boolean, 
  preference_id: number 
}

export type User = {
  [USER_KEYS.USER_ID]: string,
  [USER_KEYS.BODY_FAT]: number,
  [USER_KEYS.CURRENT_WEEK]: boolean[],
  [USER_KEYS.EXPERIENCE]: number,
  [USER_KEYS.IMAGE]: string,
  [USER_KEYS.NAME]: string,
  [USER_KEYS.PREFERENCES]: Preference[],
  [USER_KEYS.STREAK]: number,
  [USER_KEYS.TOP_FEATS]: TopFeat[],
  [USER_KEYS.WEEKLY_GOAL]: number,
  [USER_KEYS.WEIGHT]: number,
}

export type dataHistory = {
  date: string,
  value: number,
}[]