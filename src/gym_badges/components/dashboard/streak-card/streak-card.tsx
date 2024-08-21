import styles from "@/components/dashboard/streak-card/streak-card.module.scss"
import { FireIcon } from "@heroicons/react/24/solid"

export default function StreakCard() {
  return (
    <div className={styles.streak_card}>
      <h2>Your Streak</h2>
      <div className={styles.streak_count}>
        <FireIcon className={styles.icon}/>
        <p>33 weeks</p>
      </div>
      <p>This week</p>
      <p>[] [] [] [] [] [] []</p>
      <p>Mon Tue Wed Thu Fri Sat Sun</p>
    </div>
  );
}