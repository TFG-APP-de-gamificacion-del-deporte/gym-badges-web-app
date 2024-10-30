import clsx from "clsx";
import styles from "./level-bar.module.scss"
import { getExp, getLevel } from "@/lib/stats-info";


const N_BOXES = 10;  // [!] Needs to be the same as the .scss variable
const EXP_PER_LVL = 1000


export default async function LevelBar() {
  const level = await getLevel()
  const xp = await getExp()
  
  return (
    <div className={styles.container}>
      <p>Lvl {level}</p>
      <div className={styles.bar}>
        {Array.from({length: N_BOXES}).map((_, index) => (
          <div key={index} className={clsx(
            styles.box, 
            { [styles.filled]: index < xp / EXP_PER_LVL * 10 }
          )}/>
        ))}
      </div>
    </div>
  )
}
