import styles from "./stats.module.scss"
import StreakCalendar from "../../../components/streak-calendar/streak-calendar"
import ChartCard from "@/components/chart-card/chart-card"
import { API_KEYS } from "@/config/API"
import colors from "@/public/global_vars.module.scss"

export default function Page() {
  return (
    <div className={styles.layout}>
      <h2>Stats</h2>
      <div className={styles.card_layout}>
        <StreakCalendar/>
        <div className={styles.weight_fat_layout}>
          <ChartCard title="Weight" unit=" kg" dataKey={API_KEYS.WEIGHT_KEY} color={colors.green}/>
          <ChartCard title="Body Fat" unit="%" dataKey={API_KEYS.BODY_FAT_KEY} color={colors.yellow}/>
        </div>
      </div>
    </div>
  )
}