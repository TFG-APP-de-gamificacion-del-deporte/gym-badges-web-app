"use client";

import BadgeViewer from "@/components/badge-viewer/badge-viewer";
import styles from "./change-top-feats-menu.module.scss"
import { TopFeat, User } from "@/api/models";
import Badge from "@/components/badge/badge";
import { useState } from "react";
import { FaArrowsRotate, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import clsx from "clsx";
import { setTopFeatsAction } from "@/actions/user";


export default function ChangeTopFeatsMenu({ user }: { user: User }) {

  // Make sure topFeats is 3 items long
  const tf = [user.top_feats[0], user.top_feats[1], user.top_feats[2]];
  
  const [topFeats, setTopFeats] = useState<(TopFeat | null)[]>(user.top_feats.slice(0, 2));

  function handleDeleteTopFeat(index: number) {
    const newTopFeats = topFeats.map((tf, i) => i === index ? null : tf);
    // Send to the API
    setTopFeatsAction(newTopFeats.filter(tf => tf !== null));
    // Update useState
    setTopFeats(newTopFeats);
  }

  return (
    <>
      {/* BUTTON */}
      {/* @ts-ignore  */}
      <button className={styles.edit_button} popovertarget="change-top-feats">
        <FaArrowsRotate/>
        <p>Change Top Feats</p>
      </button>

      {/* MAIN POPOVER */}
      <div className={styles.popover} id="change-top-feats" popover="auto">
        {/* @ts-ignore  */}
        <header><button popovertarget="change-top-feats">
          <FaXmark size="1.5rem"/>
        </button></header>

        <div className={styles.top_feats}>
          {Array.from({length: 3}).map((_, i) =>
            <div key={i}>
              <div className={styles.badge_container}>
                { topFeats[i]
                  ? <Badge badgeInfo={topFeats[i]} noButtons/>
                  : <div className={styles.no_badge}/>
                }
              </div>
                { topFeats[i]
                  ? <button id="delete" className={styles.badge_button} onMouseDown={() => handleDeleteTopFeat(i)}>
                      <FaTrash size="1.2rem"/>
                    </button>
                    // @ts-ignore
                  : <button id="add" className={styles.badge_button} popovertarget="add-top-feat-menu">
                      <FaPlus size="1.2rem"/>
                    </button>
                }
            </div>
          )}
        </div>
      </div>

      {/* ADD BADGE POPOVER (BADGE VIEWER) */}
      <div className={clsx(styles.popover, styles.badge_viewer)} id="add-top-feat-menu" popover="auto">
        {/* @ts-ignore  */}
        <header><button popovertarget="change-top-feats">
          <FaXmark size="1.5rem"/>
        </button></header>
        <BadgeViewer addTopFeatsMode/>
      </div>
    </>
  )
}