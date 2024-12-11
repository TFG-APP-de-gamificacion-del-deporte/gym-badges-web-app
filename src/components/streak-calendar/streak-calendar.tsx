"use client";

import styles from "./streak-calendar.module.scss"
import { useEffect, useState } from "react";
import Calendar, { TileClassNameFunc } from "react-calendar";
import "./Calendar.css";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { addGymAttendanceAction, getGymAttendancesAction } from "@/actions/stats";
import useSWR from "swr";
import { redirect } from "next/navigation";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function toISODate(date: Date) {
  const month = date.getMonth() + 1
  const day = date.getDate()

  const isoDate = [
    date.getFullYear(), 
    month < 10 ? "0" + month : month, 
    day < 10 ? "0" + day : day, 
  ].join("-");

  return isoDate
}

export default function StreakCalendar() {

  const styleTile: TileClassNameFunc = ({activeStartDate, date, view}) => {    
    return gymAttendances.find(d => toISODate(d) === toISODate(date)) ? [styles.tile, styles.attended] : [styles.tile];
  }
  
  function handleCalendarClick(date: Date) {
    // Save date in useState to paint callendar
    const index = gymAttendances.findIndex(d => toISODate(d) === toISODate(date));

    if (index !== -1) {
      setGymAttendances(gymAttendances.toSpliced(index, 1));
    }
    else {
      setGymAttendances([date, ...gymAttendances]);
    }

    // Send to API
    const month = date.getMonth() + 1
    const day = date.getDate()

    const isoDate = [
      date.getFullYear(), 
      month < 10 ? "0" + month + 1 : month, 
      day < 10 ? "0" + day : day, 
    ].join("-");
    
    addGymAttendanceAction(isoDate)
  }

  const [dateRange, setDateRange] = useState<Value>(new Date());
  const [gymAttendances, setGymAttendances] = useState<Date[]>([])

  const month = new Date().getMonth() + 1;  // Month is 0-based
  const year = new Date().getFullYear();

  // Get data from the API
  const { data, error, isLoading } = useSWR("getGymAttendancesAction", getGymAttendancesAction.bind(null, month, year));
  
  useEffect(() => {
    if (data) {
      setGymAttendances((data as string[]).map(s => new Date(s)));
    }
  }, [data])
  
  if (isLoading) return;
  if (error) redirect("/internal-error");
  
  return (
    <div className={styles.calendar_card}>
      <h2>33 Weeks</h2>
      <small>Streak</small>
      <div className={styles.calendar_container}>
        <Calendar
          className={styles.calendar}
          tileClassName={styleTile}
          onChange={setDateRange}
          value={dateRange}
          view="month"
          onClickDay={handleCalendarClick}
          nextLabel=<FaAngleRight/>
          next2Label=<FaAnglesRight/>
          prevLabel=<FaAngleLeft/>
          prev2Label=<FaAnglesLeft/>
        />
      </div>
      <h3>Weekly Goal</h3>
      <p>How many times a week you plan to hit the gym?</p>
      <div className={styles.goal_selector}>
        <input type="radio" name="goal"/>
        <input type="radio" name="goal"/>
        <input type="radio" name="goal"/>
        <input type="radio" name="goal"/>
        <input type="radio" name="goal"/>
        <input type="radio" name="goal"/>
        <input type="radio" name="goal"/>
      </div>
    </div>
  )
}