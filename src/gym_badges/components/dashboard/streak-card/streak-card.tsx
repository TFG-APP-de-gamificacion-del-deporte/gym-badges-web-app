import styles from "@/components/dashboard/streak-card/streak-card.module.scss"

export default function StreakCard() {
  return (
    <div className={styles.streak_card}>
      <h2>Your Streak</h2>
      <p>33 weeks</p>
      <p>This week</p>
      <p>[] [] [] [] [] [] []</p>
      <p>Mon Tue Wed Thu</p>
    </div>
  );
}