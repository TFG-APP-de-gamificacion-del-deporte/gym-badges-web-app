"use client";

import { ApiKey } from "@/config/API"
import styles from "./chart-card.module.scss"
import { FaPlus } from "react-icons/fa6";

export default function ChartCard({ 
  title,
  unit,
  dataKey,
  color="white",
}: {
  title: string
  dataKey: ApiKey,
  unit: string,
  color?: string,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.chart_header}>
        <div className={styles.data}>
          <div>
            <h2>86{unit}</h2>
            <small style={{color: color}}>-4.1{unit}</small>
          </div>
          <small>{title}</small>
        </div>
        <button className={styles.new_button}>
          <FaPlus/>
          <span>New {title}</span>
        </button>
      </div>
      <div className={styles.chart}>Chart</div>
    </div>
  )
}