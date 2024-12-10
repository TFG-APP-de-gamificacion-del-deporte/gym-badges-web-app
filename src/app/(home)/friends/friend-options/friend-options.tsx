"use client";

import styles from "./friend-options.module.scss";
import Link from "next/link";
import { FaCircleUser, FaEllipsis, FaUserSlash } from "react-icons/fa6";
import { Friend } from "../page";
import { deleteFriend } from "@/actions/friends";

export default function FriendOptions({friend}: {friend: Friend}) {
  return (
    <>
      {/* OPTIONS BUTTON */}
      {/* @ts-ignore */}
      <button popovertarget={`options_popover_${friend.user}`} className={styles.options_button}>
        <FaEllipsis size="1.5rem"/>
      </button>
      {/* OPTIONS MENU */}
      <div id={`options_popover_${friend.user}`} className={styles.options_popover} popover="auto">
        <Link href={`user/${friend.user}`}>
          <FaCircleUser/>
          <span>See profile</span>
        </Link>
        <button onClick={() => deleteFriend(friend.user)}>
          <FaUserSlash/>
          <span>Remove friend</span>
        </button>
      </div>
    </>
  )
}