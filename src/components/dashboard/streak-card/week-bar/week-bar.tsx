"use client";

import clsx from "clsx";
import styles from "./week-bar.module.scss"
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { addGymAttendanceAction, deleteGymAttendanceAction } from "@/actions/stats";
import { toISODate } from "@/utils/dates";
import useUser from "@/utils/useUser";

const N_DAYS = Number(styles.N_DAYS);
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];


export default function WeekBar() {
  
  function handleDayClick(index: number) {
    const today = new Date();
    const shift = index + 1 - today.getDay();
    const clickedDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + shift);

    if (clickedDay.getTime() > Date.now()) {
      return;
    }

    // Update API
    if (!currentWeek[index]) {
      addGymAttendanceAction(toISODate(clickedDay));
    }
    else {
      deleteGymAttendanceAction(toISODate(clickedDay));
    }

    // Update client state
    const updatedWeek = currentWeek.map((marked, i) => {
      return i === index ? !marked : marked
    });
    setCurrentWeek(updatedWeek);
  }

  const [currentWeek, setCurrentWeek] = useState([false, false, false, false, false, false, false]);

  // Get user info
  const { user, error, isLoading } = useUser();

  // Save current week in an useState
  useEffect(() => {
    if (user) {
      setCurrentWeek(user.current_week);
    }
  }, [user])

  if (isLoading) return;
  if (error) redirect("/internal-error");

  return (
    <div className={styles.container}>
      {
        Array.from({length: N_DAYS}).map((_, index) => (
          <div className={styles.day} key={index}>
            <button 
              className={clsx(
                styles.box, 
                { [styles.filled]: currentWeek?.at(index) }
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