"use client";

import { FaCheck, FaX, FaXmark } from "react-icons/fa6"
import styles from "./badge.module.scss"
import clsx from "clsx";
import { BadgeInfo } from "@/api/models";
import { addTopFeatActrion } from "@/actions/user";
import { FaInfoCircle } from "react-icons/fa";

type BadgeProps = { badgeInfo: BadgeInfo, tooltip?: boolean, noButtons?: boolean, addTopFeatsMode?: boolean }

export default function Badge({ badgeInfo, tooltip=true, noButtons=false, addTopFeatsMode=false }: BadgeProps) {
  const popoverId = `badge_menu_${badgeInfo.id}_${crypto.randomUUID()}`

  let buttons: JSX.Element;

  // Add Top Feats mode
  if (addTopFeatsMode) { 
    if (badgeInfo.achieved) 
      buttons = (
        <button onClick={() => addTopFeatActrion(badgeInfo.id)}>
          Show off as Top Feat!
        </button>
      )
    else 
      buttons = <p>Only achieved badges can be used as top feats.</p> 
  }
  // Regular mode
  else {
    if (badgeInfo.achieved)
      buttons = (
        <button className={styles.button_unmark}>
          <><FaX/>Unmark as completed</>
        </button>
      )
    else
      buttons = <>
        <button disabled={!badgeInfo.parentAchieved}>
          <><FaCheck/>Complete Badge!</>     
        </button>
        { !badgeInfo.parentAchieved && <p className={styles.info}><FaInfoCircle/>This badge requires its preceding badge to be completed first.</p> }
      </>
  }

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
        { badgeInfo.exp && <p className={styles.exp}><span>+{badgeInfo.exp} xp</span></p>}
        { !noButtons &&
          <div className={styles.buttons}>
            {buttons}
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