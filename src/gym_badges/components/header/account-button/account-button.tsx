"use client";

import Link from "next/link";
import styles from "./account-button.module.scss"
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function AccountButton() {
  return (
  <>
  {/* @ts-ignore */}
    <button className={styles.button} popovertarget="account_popover">
      <UserIcon className={styles.icon}/>
    </button>

    <div id="account_popover" className={styles.popover} popover="auto">
      <div>
        <Link href='/account' className={styles.user}>
          <UserIcon className={styles.icon}/>
          Username
        </Link>
        <button className={styles.menu_button}>
          <Cog6ToothIcon className={styles.icon_small} />
          Settings
        </button>
        <button className={clsx(styles.menu_button, styles.logout)}>
          <ArrowLeftStartOnRectangleIcon className={styles.icon_small} />
          Log out
        </button>
      </div>
    </div>
  </>
  )
}