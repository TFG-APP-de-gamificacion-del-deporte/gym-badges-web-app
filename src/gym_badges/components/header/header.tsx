"use client";

import { incrementStreak } from "@/lib/streak-info";

export default function Header() {
  return (
    <>
      Header
      <button onClick={() => incrementStreak()}>+</button>
    </>
  );
}
