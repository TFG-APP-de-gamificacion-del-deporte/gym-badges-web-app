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

        <div className={clsx(styles.box, styles.green_border)}>
          <div>
            <h3>{statsCardProps.weight} KG</h3>
            <p>Weight</p>
          </div>
        </div>

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