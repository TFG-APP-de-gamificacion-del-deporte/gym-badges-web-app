"use client"

import clsx from "clsx"
import styles from "./stats-card.module.scss"
import useUser from "@/utils/useUser";
import { redirect } from "next/navigation";


export default function StatsCard() {
  // Get user info
  const { user, error, isLoading } = useUser();

  if (error) redirect("/internal-error");

  return (
    <div className={styles.stats_card}>
      <h2>Stats</h2>

      <div className={styles.stats}>
        {/* WEIGHT BOX */}
        <div className={clsx(styles.box, styles.green_border)}>
          <div>
            <h3>{user?.weight ?? "--"} kg</h3>
            <p>Weight</p>
          </div>
        </div>
        {/* FAT BOX */}
        <div className={clsx(styles.box, styles.yellow_border)}>
          <div>
            <h3>{user?.body_fat ?? "--"}%</h3>
            <p>Fat</p>
          </div>
        </div>
      </div>
      
    </div>
  )
}