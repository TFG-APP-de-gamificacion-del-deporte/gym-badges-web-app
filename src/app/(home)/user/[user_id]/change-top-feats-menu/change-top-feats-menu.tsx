"use client";

import BadgeViewer from "@/components/badge-viewer/badge-viewer";
import styles from "./change-top-feats-menu.module.scss"
import { TopFeat, User } from "@/api/models";
import Badge from "@/components/badge/badge";
import { MouseEvent, useEffect, useState } from "react";
import { FaArrowsRotate, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import clsx from "clsx";
import { setTopFeatsAction } from "@/actions/user";
import useUser from "@/utils/useUser";
import { redirect } from "next/navigation";
import useDebounce from "@/utils/useDebounce";


export default function ChangeTopFeatsMenu() {
  const [topFeats, setTopFeats] = useState<(TopFeat | null)[]>([]);
  const debaundedTF = useDebounce(topFeats, 500);

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      // Make sure topFeats is 3 items long
      const tf = [user.top_feats[0], user.top_feats[1], user.top_feats[2]];
      setTopFeats(user.top_feats);
    }
  }, [user]);

  if (isLoading) { return }
  if (error) { redirect("/internal-error") }

  function handleDeleteTopFeat(index: number) {
    if (topFeats[index] === null) { return }

    const newTopFeats = topFeats.map((tf, i) => i === index ? null : tf);

    // Send to the API
    setTopFeatsAction(newTopFeats.filter(tf => tf !== null).map(tf => tf.id));
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
                { debaundedTF[i]
                  ? <button className={styles.badge_button} onMouseDown={() => handleDeleteTopFeat(i)}>
                      <FaTrash size="1.2rem"/>
                    </button>
                    // @ts-ignore
                  : <button className={styles.badge_button} popovertarget="add-top-feat-menu">
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