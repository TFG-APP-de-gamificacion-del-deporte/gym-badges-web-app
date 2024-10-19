"use client";

import clsx from "clsx";
import styles from "./week-bar.module.scss"
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { setWeek } from "@/lib/streak-info";


const N_DAYS = 7; // [!] Needs to be the same as the .scss variable
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


export type WeekBarProps = boolean[];


export default function WeekBar({ initialWeek }: { initialWeek: WeekBarProps }) {
  const [currentWeek, setCurrentWeek] = useState(initialWeek);
  const debouncedWeek = useDebounce(currentWeek, 500);

  function handleDayFill(index: number) {
    const updatedWeek = currentWeek.map((day, i) => {
      return i === index ? !currentWeek[i] : currentWeek[i]
    });
    // Update client state
    setCurrentWeek(updatedWeek);
  }

  // Update database when debounced week changes
  useEffect(() => {
    setWeek(debouncedWeek)
  }, [debouncedWeek]);

  return (
    <div className={styles.container}>
      {Array.from({length: N_DAYS}).map((_, index) => (
        <div className={styles.day} key={index}>
          <button onClick={() => handleDayFill(index)} className={clsx(
            styles.box, 
            { [styles.filled]: currentWeek.at(index) }
          )}/>
          <small>{DAYS[index]}</small>
        </div>
      ))}
    </div>
  )
}