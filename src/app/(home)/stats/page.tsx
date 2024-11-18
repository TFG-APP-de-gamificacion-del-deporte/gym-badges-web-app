import styles from "./stats.module.scss"
import StreakCalendar from "../../../components/streak-calendar/streak-calendar"

export default function Page() {
  return (
    <div className={styles.layout}>
      <h2>Stats</h2>
      <div className={styles.card_layout}>
        {/* STREAK CALENDAR */}
        <StreakCalendar/>
        {/* WEIGHT AND FAT */}
        <div className={styles.weight_fat_layout}>
          {/* WEIGHT CARD */}
          <div className={styles.weight_card}>
            <div className={styles.chart_header}>
              <div className={styles.data}>
                <div>
                  <h2>86 KG</h2>
                  <small>-4.1 KG</small>
                </div>
                <small>Weight</small>
              </div>
              <button>+ New Weight</button>
            </div>
            <div>Chart</div>
          </div>
          {/* FAT CARD */}
          <div className={styles.fat_card}>
            <div className={styles.chart_header}>
              <div className={styles.data}>
                <div>
                  <h2>18%</h2>
                  <small>-2,8%</small>
                </div>
                <small>Body Fat</small>
              </div>
              <button>+ New body fat</button>
            </div>
            <div>Chart</div>
          </div>
        </div>
      </div>
    </div>
  )
}