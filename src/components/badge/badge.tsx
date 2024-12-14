"use client";

import { FaCheck, FaX, FaXmark } from "react-icons/fa6"
import styles from "./badge.module.scss"
import clsx from "clsx";
import { BadgeInfo } from "@/api/models";
import { addTopFeatActrion } from "@/actions/user";

type BadgeProps = { badgeInfo: BadgeInfo, tooltip?: boolean, noButtons?: boolean, addTopFeatsMode?: boolean }

export default function Badge({ badgeInfo, tooltip=true, noButtons=false, addTopFeatsMode=false }: BadgeProps) {
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
        <img src={badgeInfo.image} className={badgeInfo.achieved ? styles.achieved : ""} alt={badgeInfo.id.toString()} draggable={false}/>
        <h2>{badgeInfo.name}</h2>
        <p className={styles.exp}><span>+{badgeInfo.exp} xp</span></p>
        { !noButtons &&
          <div className={styles.buttons}>
            { addTopFeatsMode
              ? badgeInfo.achieved 
                ? <button onClick={() => addTopFeatActrion(badgeInfo.id)}>
                    Show off as Top Feat!
                  </button>
                : <p>Only achieved badges can be used as top feats.</p> 
              : <button className={badgeInfo.achieved ? styles.button_unmark : ""}>
                  { badgeInfo.achieved
                    ? <><FaX/>Unmark as completed</>
                    : <><FaCheck/>Complete Badge!</>
                  }
                </button>
            }
          </div>
        }
      </div>

      {/* BADGE */}
      {/* @ts-ignore  */}
      <button className={clsx(styles.badge, {[styles.achieved]: badgeInfo.achieved})} popovertarget={popoverId}>
        {/* TOOLTIP */}
        {tooltip && <span className={styles.tooltip}>{badgeInfo.name}</span>}
        {/* ICON */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badgeInfo.image} alt={badgeInfo.id.toString()} draggable={false}/>
      </button>
    </>
  )
}