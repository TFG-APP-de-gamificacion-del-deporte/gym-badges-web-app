import Link from "next/link";
import styles from "./account-button.module.scss"
import clsx from "clsx";
import { FaArrowRightFromBracket, FaGear, FaUser } from "react-icons/fa6";

// TODO Poner imagen de perfil en vez de boton
export default function AccountButton() {
  return (
  <>
    {/* @ts-ignore */}
    <button className={styles.button} popovertarget="account_popover">
      <FaUser size="1.5rem"/>
    </button>

    <div id="account_popover" className={styles.popover} popover="auto">
      <div>
        <Link href='/account' className={styles.user}>
          <FaUser size="1.5rem"/>
          Username
        </Link>
        <button className={styles.menu_button}>
          <FaGear size="1.5rem"/>
          Settings
        </button>
        <button className={clsx(styles.menu_button, styles.logout)}>
          <FaArrowRightFromBracket size="1.5rem"/>
          Log out
        </button>
      </div>
    </div>
  </>
  )
}