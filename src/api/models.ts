import { USER_KEYS } from "./constants";

export type TopFeat = {
  description: "string",
  id: number,
  image: "string",
  name: "string"
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