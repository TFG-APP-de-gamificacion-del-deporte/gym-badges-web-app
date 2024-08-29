"use server";

// ===== Mocked Database =====
let weight = 86;
let fat = 18;


export async function getWeigth() {
  return weight;
}

export async function getFat() {
  return fat;
}