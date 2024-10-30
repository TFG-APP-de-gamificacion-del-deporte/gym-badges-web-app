"use server";

import { StatsCardProps } from "@/components/dashboard/stats-card/stats-card";

// ===== Mocked Database =====
let weight = 86;
let fat = 18;

let level = 11
let exp = 230


// TODO Make fetching data non server functions
export async function getStats(): Promise<StatsCardProps> {
  return { weight, fat }
}

export async function getLevel() {
  return level;
}

export async function getExp() {
  return exp;
}