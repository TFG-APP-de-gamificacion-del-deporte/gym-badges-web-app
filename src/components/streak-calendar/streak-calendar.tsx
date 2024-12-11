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
import { toISODate } from "@/utils/dates";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

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

    const isoDate = toISODate(date)

    // Check if date is already in
    const index = gymAttendances.findIndex(d => toISODate(d) === isoDate);
    
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

  if (isLoading || userLoading) return;
  if (error || userRrror) redirect("/internal-error");
  
  return (
    <div className={styles.calendar_card}>
      <h2>{user?.streak} week{user?.streak as number !== 1 ? "s" : ""}</h2>
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
        }}
      >
        <input type="radio" name="goal" value={1} defaultChecked={user?.weekly_goal === 1}/>
        <input type="radio" name="goal" value={2} defaultChecked={user?.weekly_goal === 2}/>
        <input type="radio" name="goal" value={3} defaultChecked={user?.weekly_goal === 3}/>
        <input type="radio" name="goal" value={4} defaultChecked={user?.weekly_goal === 4}/>
        <input type="radio" name="goal" value={5} defaultChecked={user?.weekly_goal === 5}/>
        <input type="radio" name="goal" value={6} defaultChecked={user?.weekly_goal === 6}/>
        <input type="radio" name="goal" value={7} defaultChecked={user?.weekly_goal === 7}/>
      </div>
    </div>
  )
}