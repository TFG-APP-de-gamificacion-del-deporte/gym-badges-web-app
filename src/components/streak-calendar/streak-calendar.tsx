"use client";

import styles from "./streak-calendar.module.scss"
import { useState } from "react";
import Calendar, { TileClassNameFunc } from 'react-calendar';
import './Calendar.css';
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const N_DAYS = 7

export default function StreakCalendar() {
  const [dateRange, setDateRange] = useState<Value>(new Date());
  const [gymAttendances, setGymAttendances] = useState([
    new Date(2024, 9, 28),
    new Date(2024, 9, 29),
    new Date(2024, 9, 30),
    new Date(2024, 9, 31),
    new Date(2024, 10, 4),
    new Date(2024, 10, 5),
    new Date(2024, 10, 7),
    new Date(2024, 10, 8),
    new Date(2024, 10, 11),
    new Date(2024, 10, 13),
    new Date(2024, 10, 14),
    new Date(2024, 10, 18),
  ])
  
  const styleTile: TileClassNameFunc = ({activeStartDate, date, view}) => {    
    return gymAttendances.find(d => d.valueOf() == date.valueOf()) ? [styles.tile, styles.attended] : [styles.tile];
  }
  
  function handleCalendarClick(date: Date) {
    const index = gymAttendances.findIndex(d => d.valueOf() == date.valueOf());

    if (index != -1) {
      setGymAttendances(gymAttendances.toSpliced(index, 1));
    }
    else {
      setGymAttendances([date, ...gymAttendances]);
    }
  }
  
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
          locale="en-US"
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