"use server";

// ===== Mocked Database =====
let weight = 86;
let fat = 18;

let level = 11
let exp = 230

export async function getWeigth() {
  return weight;
}

export async function getFat() {
  return fat;
}

export async function getLevel() {
  return level;
}

export async function getExp() {
  return exp;
}