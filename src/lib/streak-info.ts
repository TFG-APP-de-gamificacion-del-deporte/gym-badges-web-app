"use server";

import { revalidatePath } from "next/cache";

// ===== Mocked Database =====
let streak = 33;
let currentWeek = [true, false, true, true, false, false, false];


// ===== Streak =====
export async function getStreak(): Promise<number> {
  // Delay for demo purposes
  // console.log('Fetching revenue data...');
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return streak;
}

export async function incrementStreak() {
  streak++;
  revalidatePath("@/components/dashboard/streak-card");
}


// ===== Current week =====
export async function getCurrentWeek() {
  return currentWeek;
}

export async function setWeek(newWeek: Array<boolean>) {
  currentWeek = newWeek;
}
