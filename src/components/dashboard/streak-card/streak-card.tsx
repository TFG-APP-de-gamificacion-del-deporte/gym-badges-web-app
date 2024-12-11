import styles from "@/components/dashboard/streak-card/streak-card.module.scss"
import WeekBar from "./week-bar/week-bar";
import { FaFire } from "react-icons/fa6";

export default function StreakCard() {
  return (
    <div className={styles.streak_card}>
      {/* TITLE AND STREAK */}
      <div className={styles.streak}>
        <h2>Your Streak</h2>
        <div className={styles.streak_count}>
          <FaFire size="1.5rem"/>
          <h3>{33} week{33 > 1 ? "s" : ""}</h3>
        </div>
      </div>
      {/* WEEK BAR */}
      <div className={styles.this_week}>
        <p>This Week</p>
        <WeekBar/>
      </div>
    </div>
  );
}