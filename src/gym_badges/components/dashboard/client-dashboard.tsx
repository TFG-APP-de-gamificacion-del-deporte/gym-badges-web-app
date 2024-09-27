"use client";

import styles from "./client-dashboard.module.scss";
import { useEffect, useState } from "react";
import StatsCard, { StatsCardProps } from "./stats-card/stats-card";
import LineSeparator from "../line-separator/line-separator";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import StreakCard, { StreakCardProps } from "./streak-card/streak-card";
import useScreenSize from "@/hooks/useScreenSize";

type ClientDashboardProps = {
  streakCardProps: StreakCardProps;
  statsCardProps: StatsCardProps;
}

export default function ClientDashboard({ statsCardProps, streakCardProps }: ClientDashboardProps) {
  const [hidden, setHidden] = useState(false);
  const [usedButton, setUsedButton] = useState(false);
  const { width } = useScreenSize();

  const toggleHidden = () => {
    setUsedButton(true);
    setHidden(!hidden);
  }

  useEffect(() => {
    if (usedButton && hidden) { return }  // Used to hide --> Keep hided

    if (!usedButton && width <= 1000) { 
      setHidden(true) 
    }
    else if (width > 1000) { 
      setHidden(false);
      setUsedButton(false);
    }
  }, [width]);

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
        <button onClick={toggleHidden}>
          {!hidden && <ChevronLeftIcon className={styles.icon} />}
          {hidden && <ChevronRightIcon className={styles.icon} />}
        </button>
      </div>

    </div>
  );
}