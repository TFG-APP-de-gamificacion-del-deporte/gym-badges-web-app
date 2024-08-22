import styles from "./week-bar.module.scss"

export default function WeekBar() {
  const n_days = 7; // [!] Needs to be the same as the .scss variable
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <p>This Week</p>
      <div className={styles.container}>
        {Array.from({length: n_days}).map((_, index) => (
          <div className={styles.day} key={index}>
            <div className={styles.box}/>
            <h6>{days[index]}</h6>
          </div>
        ))}
      </div>
    </>
  )
}