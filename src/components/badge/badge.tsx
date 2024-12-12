"use client";

import { FaCheck, FaPlus, FaX, FaXmark } from "react-icons/fa6"
import styles from "./badge.module.scss"
import clsx from "clsx";

export interface BadgeInfo {
  id: number,
  name: string,
  achieved: boolean,
  image: string,
  description: string,
}

// TODO Add option to not show the complete badge button
export default function Badge({ badgeInfo, tooltip=true }: { badgeInfo: BadgeInfo, tooltip?: boolean }) {
  const popoverId = `badge_menu_${badgeInfo.id}_${crypto.randomUUID()}`

  return (
    <>
      {/* POPOVER MENU */}
      <div className={styles.badge_menu} id={popoverId} popover="auto">
        {/* @ts-ignore  */}
        <header><button popovertarget={popoverId}>
          <FaXmark size="1.5rem"/>
        </button></header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/badge-icons/${badgeInfo.image}`} className={badgeInfo.achieved ? styles.achieved : ""} alt={badgeInfo.id.toString()} draggable={false}/>
        <h2>{badgeInfo.name}</h2>
        <div className={styles.buttons}>
          <button className={badgeInfo.achieved ? styles.button_unmark : ""}>
            { badgeInfo.achieved
              ? <><FaX/>Unmark as Complete</>
              : <><FaCheck/>Complete Badge!</>
            }
          </button>
          { !badgeInfo.achieved &&
            <button>
              <FaPlus/>
              Add as Top Feat
            </button>
          }
        </div>
      </div>

      {/* BADGE */}
      {/* @ts-ignore  */}
      <button className={clsx(styles.badge, {[styles.achieved]: badgeInfo.achieved})} popovertarget={popoverId}>
        {/* TOOLTIP */}
        {tooltip && <span className={styles.tooltip}>{badgeInfo.name}</span>}
        {/* ICON */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/badge-icons/${badgeInfo.id}.svg`} alt={badgeInfo.id.toString()} draggable={false}/>
      </button>
    </>
  )
}