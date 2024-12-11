"use client";

import styles from "./streak-calendar.module.scss"
import { useEffect, useState } from "react";
import Calendar, { TileClassNameFunc } from "react-calendar";
import "./Calendar.css";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { addGymAttendanceAction, deleteGymAttendanceAction, getGymAttendancesAction } from "@/actions/stats";
import useSWR from "swr";
import { redirect } from "next/navigation";
import { getUserAction, setWeeklyGoalAction } from "@/actions/user";

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
    if (date.getTime() > Date.now()) {
      return styles.tile_disabled;
    }
    
    return gymAttendances.find(d => toISODate(d) === toISODate(date)) ? [styles.tile, styles.attended] : [styles.tile];
  }
  
  function handleCalendarClick(date: Date) {
    if (date.getTime() > Date.now()) {
      return;
    }

    const month = date.getMonth() + 1
    const day = date.getDate()
    const isoDate = [
      date.getFullYear(), 
      month < 10 ? "0" + month + 1 : month, 
      day < 10 ? "0" + day : day, 
    ].join("-");

    // Check if date is already in
    const index = gymAttendances.findIndex(d => toISODate(d) === toISODate(date));
    
    // Already in
    if (index !== -1) { 
      setGymAttendances(gymAttendances.toSpliced(index, 1));
      deleteGymAttendanceAction(isoDate);
    }
    // New date
    else { 
      setGymAttendances([date, ...gymAttendances]);
      addGymAttendanceAction(isoDate)
    }
  }

  const [dateRange, setDateRange] = useState<Value>(new Date());
  const [gymAttendances, setGymAttendances] = useState<Date[]>([])
  const [checked, setCheched] = useState<number>();

  const month = new Date().getMonth() + 1;  // Month is 0-based
  const year = new Date().getFullYear();

  // Get data from the API
  const { data, error, isLoading } = useSWR("getGymAttendancesAction", getGymAttendancesAction.bind(null, month, year));
  
  useEffect(() => {
    if (data) {
      setGymAttendances((data as string[]).map(s => new Date(s)));
    }
  }, [data])

  // Get user info
  const { data: user, error: userRrror, isLoading: userLoading } = useSWR("getUserAction", getUserAction.bind(null, undefined));

  useEffect(() => {
    if (user) {
      setCheched(user.weekly_goal);
    }
  }, [user])
  
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
      <div 
        className={styles.goal_selector} 
        onChange={ e => {
          const n = Number((e.target as HTMLInputElement).value);
          setWeeklyGoalAction(n);
          setCheched(n)
        }}
      >
        <input type="radio" name="goal" value={1} checked={checked === 1}/>
        <input type="radio" name="goal" value={2} checked={checked === 2}/>
        <input type="radio" name="goal" value={3} checked={checked === 3}/>
        <input type="radio" name="goal" value={4} checked={checked === 4}/>
        <input type="radio" name="goal" value={5} checked={checked === 5}/>
        <input type="radio" name="goal" value={6} checked={checked === 6}/>
        <input type="radio" name="goal" value={7} checked={checked === 7}/>
      </div>
    </div>
  )
}