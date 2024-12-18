"use client";

import styles from "./logout-button.module.scss"
import { logoutAction } from "@/actions/login";
import { FaArrowRightFromBracket } from "react-icons/fa6";

export default function LogoutButton() {
  return (
    <button className={styles.button} onClick={() => logoutAction()}>
      <FaArrowRightFromBracket/>
      Log out
    </button>
  )
}