import styles from "@/components/dashboard/streak-card/streak-card.module.scss"
import FireIcon from "@heroicons/react/24/solid/FireIcon";
import WeekBar, { WeekBarProps } from "./week-bar/week-bar";


export type StreakCardProps = {
  streak: number;
  currentWeek: WeekBarProps;
}


export default function StreakCard({ streakCardProps }: { streakCardProps: StreakCardProps }) {
  return (
    <div className={styles.streak_card}>
      {/* TITLE AND STREAK */}
      <div className={styles.streak}>
        <h2>Your Streak</h2>
        <div className={styles.streak_count}>
          <FireIcon className={styles.icon}/>
          <h3>{streakCardProps.streak.toString()} week{streakCardProps.streak > 1 ? "s" : ""}</h3>
        </div>
      </div>
      {/* WEEK BAR */}
      <div className={styles.this_week}>
        <p>This Week</p>
        <WeekBar initialWeek={streakCardProps.currentWeek}/>
      </div>
    </div>
  );
}