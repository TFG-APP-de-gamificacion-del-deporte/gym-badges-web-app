"use client";

import styles from "./client-dashboard.module.scss";
import { useEffect, useState } from "react";
import StatsCard, { StatsCardProps } from "./stats-card/stats-card";
import LineSeparator from "../line-separator/line-separator";
import StreakCard, { StreakCardProps } from "./streak-card/streak-card";
import clsx from "clsx";
import { FaChevronLeft } from "react-icons/fa6";
import useMobileScreen from "@/hooks/useMobileScreen";

type ClientDashboardProps = {
  streakCardProps: StreakCardProps;
  statsCardProps: StatsCardProps;
}

export default function ClientDashboard({ statsCardProps, streakCardProps }: ClientDashboardProps) {
  const [hidden, setHidden] = useState(false);

  const isMobile = useMobileScreen();
  useEffect(() => {
    setHidden(isMobile);
  }, [isMobile])

  const toggleHidden = () => {
    setHidden(!hidden);
  }

  return (
    <div className={clsx([styles.dashboard, {[styles.open]: !hidden}])}>
      {/* DASHBOARD */}
      { !hidden && 
        <div className={styles.widgets}>
            <StreakCard streakCardProps={streakCardProps}/>
            <StatsCard statsCardProps={statsCardProps}/>
        </div>
      }

      {/* LINE SEPARATOR */}
      <div className={styles.separator_container}>
        {!hidden && <LineSeparator/>}
      </div>

      {/* HIDE BUTTON */}
      <div className={styles.hide_button}>
        <button className={clsx({[styles.flip_button]: hidden})} onClick={toggleHidden}>
          <FaChevronLeft size="1.5rem"/>
        </button>
      </div>
    </div>
  );
}