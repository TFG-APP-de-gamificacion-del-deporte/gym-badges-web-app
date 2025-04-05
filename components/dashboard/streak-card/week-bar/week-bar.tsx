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

function isDayClickable(index: number) {
  const today = new Date();
  const todaysNum = today.getDay() === 0 ? 6 : today.getDay() - 1;  // Sunday should be index 6
  const shift = index - todaysNum;
  const clickedDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + shift);

  return { 
    clickable: clickedDay.getTime() <= today.getTime(),
    clickedDay: clickedDay,
  };
}

export default function WeekBar() {
  
  function handleDayClick(index: number) {
    
    const { clickable, clickedDay } = isDayClickable(index);

    if (!clickable) return;

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
      console.log(user.current_week);  // FIXME Wrong current week
      
      setCurrentWeek(user.current_week);
    }
  }, [user])

  if (error) redirect("/internal-error");

  return (
    <div className={styles.container}>
      {
        Array.from({length: N_DAYS}).map((_, index) => (
          <div className={styles.day} key={index}>
            <button 
              className={clsx(
                styles.box, 
                { 
                  [styles.filled]: currentWeek?.at(index),
                  [styles.clickable]: isDayClickable(index).clickable,
                }
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