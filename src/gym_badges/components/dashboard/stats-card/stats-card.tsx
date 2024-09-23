import clsx from "clsx"
import styles from "./stats-card.module.scss"
import { getFat, getWeigth } from "@/lib/stats-info"

export default async function StatsCard() {
  const weight = await getWeigth()
  const fat = await getFat()

  return (
    <div className={styles.stats_card}>
      <h2>Stats</h2>
      <div className={styles.stats}>
        <div className={clsx(styles.box, styles.green_border)}>
          <div>
            <h3>{weight} KG</h3>
            <p>Weight</p>
          </div>
        </div>
        <div className={clsx(styles.box, styles.yellow_border)}>
          <div>
            <h3>{fat}%</h3>
            <p>Fat</p>
          </div>
        </div>
      </div>
    </div>
  )
}