"use client";

import styles from "./client-dashboard.module.scss";
import { useState } from "react";
import StatsCard, { StatsCardProps } from "./stats-card/stats-card";
import LineSeparator from "../line-separator/line-separator";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import StreakCard, { StreakCardProps } from "./streak-card/streak-card";

type ClientDashboardProps = {
  streakCardProps: StreakCardProps;
  statsCardProps: StatsCardProps;
}

export default function ClientDashboard({ statsCardProps, streakCardProps }: ClientDashboardProps) {
  const [hidden, setHidden] = useState(false);

  // TODO Change chevron icon

  return (
    <div className={styles.dashboard}>
      
      { 
        !hidden && 
        <div className={styles.widgets}>
            <StreakCard streakCardProps={streakCardProps} />
            <StatsCard statsCardProps={statsCardProps} />
        </div>
      }

      {!hidden && <LineSeparator vertical/>}

      <div className={styles.collapse_button}>
        <button>
          <ChevronLeftIcon className={styles.icon} onClick={() => setHidden(!hidden)}/>
        </button>
      </div>

    </div>
  );
}