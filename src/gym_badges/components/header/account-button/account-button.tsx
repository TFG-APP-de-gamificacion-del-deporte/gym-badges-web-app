"use client";

import styles from "./account-button.module.scss"
import { UserIcon } from "@heroicons/react/24/solid";

export default function AccountButton() {
  return (
  <>
    <button className={styles.box}>
      <UserIcon className={styles.icon}/>
    </button>
  </>
  )
}