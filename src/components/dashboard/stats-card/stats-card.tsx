import clsx from "clsx"
import styles from "./stats-card.module.scss"


export type StatsCardProps = {
  weight: number;
  fat: number;
}


export default function StatsCard({ statsCardProps }: { statsCardProps: StatsCardProps }) {
  return (
    <div className={styles.stats_card}>
      <h2>Stats</h2>

      <div className={styles.stats}>
        {/* WEIGHT BOX */}
        <div className={clsx(styles.box, styles.green_border)}>
          <div>
            <h3>{statsCardProps.weight} kg</h3>
            <p>Weight</p>
          </div>
        </div>
        {/* FAT BOX */}
        <div className={clsx(styles.box, styles.yellow_border)}>
          <div>
            <h3>{statsCardProps.fat}%</h3>
            <p>Fat</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}