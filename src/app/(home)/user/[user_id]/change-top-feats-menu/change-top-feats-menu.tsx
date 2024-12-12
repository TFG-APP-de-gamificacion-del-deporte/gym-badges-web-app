"use client";

import styles from "./change-top-feats-menu.module.scss"
import { TopFeat, User } from "@/api/models";
import Badge from "@/components/badge/badge";
import { useState } from "react";
import { FaArrowsRotate, FaFloppyDisk, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";


export default function ChangeTopFeatsMenu({ user, tempTF }: { user: User, tempTF: TopFeat[] }) {

  const [topFeats, setTopFeats] = useState<(TopFeat | null)[]>(tempTF.slice(0, 2));

  return (
    <>
      {/* EDIT PROFILE BUTTON */}
      {/* @ts-ignore  */}
      <button className={styles.edit_button} popovertarget="change-top-feats">
        <FaArrowsRotate/>
        <p>Change Top Feats</p>
      </button>
      {/* POPOVER */}
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
              <div className={styles.badge_buttons}>
                { topFeats[i]
                  ? <>
                      <button><FaArrowsRotate size="1.2rem"/></button>
                      <button><FaTrash size="1.2rem"/></button>
                    </>
                  :
                    <button><FaPlus size="1.2rem"/></button>
                }
              </div>
            </div>
          )}
        </div>
        
        <button className={styles.save_button}>
          <FaFloppyDisk/>
          <span>Save</span>
        </button>

      </div>
    </>
  )
}