import styles from "./stats.module.scss"

const N_DAYS = 7

export default function Page() {
  return (
    <div className={styles.layout}>
      <h2>Stats</h2>
      <div className={styles.card_layout}>
        {/* STREAK CALENDAR */}
        <div className={styles.calendar_card}>
          <h2>33 Weeks</h2>
          <small>Streak</small>
          <div>Calendar</div>
          <h3>Weekly Goal</h3>
          <p>How many times a week you plan to hit the gym?</p>
          <div className={styles.goal_selector}>
            {
              Array.from({length: N_DAYS}).map((_, index) => (
                <label className={styles.goal_label} key={index}>
                  <input type="radio" name="goal" hidden/>
                  {index + 1}
                </label>
              ))
            }
          </div>
        </div>
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