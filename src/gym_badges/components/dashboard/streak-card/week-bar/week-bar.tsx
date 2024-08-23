"use client";

import clsx from "clsx";
import styles from "./week-bar.module.scss"
import { setDay } from "@/lib/streak-info";

function handleDayFill() {

}

export default function WeekBar({ currentWeek }: { currentWeek: Array<boolean> }) {
  const n_days = 7; // [!] Needs to be the same as the .scss variable
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <p>This Week</p>
      <div className={styles.container}>
        {Array.from({length: n_days}).map((_, index) => (
          <div className={styles.day} key={index}>
            <button onClick={() => {setDay(index)}} className={clsx(
              styles.box, 
              { [styles.filled]: currentWeek.at(index) }
            )}/>
            <small>{days[index]}</small>
          </div>
        ))}
      </div>
    </>
  )
}