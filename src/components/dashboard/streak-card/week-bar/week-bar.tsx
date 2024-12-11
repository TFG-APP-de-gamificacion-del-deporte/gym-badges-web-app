"use client";

import clsx from "clsx";
import styles from "./week-bar.module.scss"
import { useEffect, useState } from "react";
import useDebounce from "@/utils/useDebounce";
import { setWeek } from "@/actions/streak-info";

const N_DAYS = Number(styles.N_DAYS);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


export default function WeekBar() {
  const [currentWeek, setCurrentWeek] = useState([false, false, false, false, false, false, false]);
  const debouncedWeek = useDebounce(currentWeek, 500);

  function handleDayClick(index: number) {
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
      {
        Array.from({length: N_DAYS}).map((_, index) => (
          <div className={styles.day} key={index}>
            <button 
              className={clsx(
                styles.box, 
                { [styles.filled]: currentWeek.at(index) }
              )}
              onClick={() => handleDayClick(index)}
            />
            <small>{DAYS[index]}</small>
          </div>
        ))
      }
    </div>
  )
}