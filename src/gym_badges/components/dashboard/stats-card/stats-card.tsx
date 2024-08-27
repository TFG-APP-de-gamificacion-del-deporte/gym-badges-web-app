import styles from "./stats-card.module.scss"

export default function StatsCard() {
  return (
    <div className={styles.stats_card}>
      <h2>Stats</h2>
      <p>[Weight]</p>
      <p>[Fat]</p>
    </div>
  )
}