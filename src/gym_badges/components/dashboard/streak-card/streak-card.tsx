import styles from "@/components/dashboard/streak-card/streak-card.module.scss"
import FireIcon from "@heroicons/react/24/solid/FireIcon";
import WeekBar from "./week-bar/week-bar";
import { getCurrentWeek, getStreak } from "@/lib/streak-info";

export default async function StreakCard() {
  const streak = await getStreak(); 
  const currentWeek = await getCurrentWeek();

  return (
    <div className={styles.streak_card}>
      <h2>Your Streak</h2>
      <div className={styles.streak_count}>
        <FireIcon className={styles.icon}/>
        <h3>{streak.toString()} week{streak > 1 ? "s" : ""}</h3>
      </div>
      <WeekBar initialWeek={currentWeek}/>
    </div>
  );
}