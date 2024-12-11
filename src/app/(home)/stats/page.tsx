import styles from "./stats.module.scss"
import StreakCalendar from "../../../components/streak-calendar/streak-calendar"
import ChartCard from "@/components/chart-card/chart-card"
import colors from "@/styles/colors.module.scss"
import { USER_KEYS } from "@/api/constants"

export default function Page() {
  return (
    <div className={styles.layout}>
      <h2>Stats</h2>
      <div className={styles.card_layout}>
        <StreakCalendar/>
        <div className={styles.weight_fat_layout}>
          <ChartCard title="Weight" unit=" kg" dataKey={USER_KEYS.WEIGHT} color={colors.green}/>
          <ChartCard title="Body Fat" unit="%" dataKey={USER_KEYS.BODY_FAT} color={colors.yellow}/>
        </div>
      </div>
    </div>
  )
}