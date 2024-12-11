import clsx from "clsx"
import styles from "./stats-card.module.scss"


export default function StatsCard() {
  return (
    <div className={styles.stats_card}>
      <h2>Stats</h2>

      <div className={styles.stats}>
        {/* WEIGHT BOX */}
        <div className={clsx(styles.box, styles.green_border)}>
          <div>
            <h3>{88.5} kg</h3>
            <p>Weight</p>
          </div>
        </div>
        {/* FAT BOX */}
        <div className={clsx(styles.box, styles.yellow_border)}>
          <div>
            <h3>{18}%</h3>
            <p>Fat</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}