import clsx from "clsx";
import styles from "./level-bar.module.scss"
import { getUserAction } from "@/actions/user";


const N_BOXES = Number(styles.N_BOXES);
const EXP_PER_LVL = 100


export default async function LevelBar() {
  const user = await getUserAction();
  
  return (
    <div className={styles.container}>
      <p>Lvl {Math.trunc(user.experience / EXP_PER_LVL)}</p>
      <div className={styles.bar}>
        {Array.from({length: N_BOXES}).map((_, index) => (
          <div key={index} className={clsx(
            styles.box, 
            { [styles.filled]: index < (user.experience % EXP_PER_LVL) / N_BOXES }
          )}/>
        ))}
      </div>
    </div>
  )
}
