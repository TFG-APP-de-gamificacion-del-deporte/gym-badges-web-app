"use client";

import styles from "./dashboard.module.scss";
import { useEffect, useState } from "react";
import StatsCard from "./stats-card/stats-card";
import LineSeparator from "../line-separator/line-separator";
import StreakCard from "./streak-card/streak-card";
import clsx from "clsx";
import { FaChevronLeft } from "react-icons/fa6";
import useMobileScreen from "@/utils/useMobileScreen";

export default function ClientDashboard() {
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
            <StreakCard/>
            <StatsCard/>
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