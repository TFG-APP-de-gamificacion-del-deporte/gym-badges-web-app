import { FaX, FaXmark } from "react-icons/fa6"
import styles from "./badge.module.scss"

export interface BadgeInfo {
  id: number,
  name: string,
}

export default function Badge({ badgeInfo, achieved=false }: { badgeInfo: BadgeInfo, achieved?: boolean}) {
  return (
    <>
      {/* POPOVER MENU */}
      <div className={styles.badge_menu} id={`badge_menu_${badgeInfo.id}`} popover="auto">
        <header><button><FaXmark size="1.5rem"/></button></header>
        <img src={`/badge-icons/${badgeInfo.id}.svg`} alt={badgeInfo.id.toString()} draggable={false}/>
        <h2>{badgeInfo.name}</h2>
        <button className={ achieved ? styles.button_unmark : styles.button_complete }>
          { achieved
            ? "Unmark as Complete"
            : "Complete Badge!"
          }
        </button>
      </div>

      {/* BADGE */}
      {/* @ts-ignore  */}
      <button className={styles.badge} popovertarget={`badge_menu_${badgeInfo.id}`}>
        {/* TOOLTIP */}
        {badgeInfo.id && <span className={styles.tooltip}>{badgeInfo.name}</span>}
        {/* ICON */}
        <img src={`/badge-icons/${badgeInfo.id}.svg`} alt={badgeInfo.id.toString()} draggable={false}/>
      </button>
    </>
  )
}