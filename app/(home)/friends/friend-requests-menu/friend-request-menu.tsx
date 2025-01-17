"use client";

import styles from "./friend-request-menu.module.scss"
import { FaBell, FaCheck, FaXmark } from "react-icons/fa6";
import { getFriendsAction } from "@/actions/friends";
import ProfilePicture from "@/components/profile-picture/profile-picture";
import Link from "next/link";
import useSWR from "swr";

export default function FriendRequestsMenu() {
  // TODO Get friend requests instead of friend list
  const { data: friends, error, isLoading } = useSWR(["getFriends", 1], ([_, p]) => getFriendsAction(undefined, p), { refreshInterval: 5000 });

  return (
    <>
      {/* FRIEND REQUESTS BUTTON */}
      {/* @ts-ignore  */}
      <button className={styles.friend_requests_button} popovertarget="friend-requests-popover">
        <FaBell />
      </button>
      {/* FRIEND REQUESTS POPOVER */}
      <div className={styles.friend_requests_popover} id="friend-requests-popover" popover="auto">
        <header>
          <h3>Friend requests</h3>
          {/* @ts-ignore  */}
          <button popovertarget="friend-requests-popover">
            <FaXmark size="1.5rem" />
          </button>
        </header>
        <div className={styles.friends_list}>
          {friends && friends.map(friend =>
            <div className={styles.friend} key={friend.user}>
              <div className={styles.avatar}>
                {/* IMAGE, NAME AND USERNAME */}
                <div className={styles.image_container}>
                  <ProfilePicture image_b64={friend.image} />
                </div>
                <Link href={`user/${friend.user}`} className={styles.username}>
                  {friend.name}<br /><small>{friend.user}</small>
                </Link>
                <div className={styles.accept_reject_buttons}>
                  <button className={styles.accept_button}><FaCheck size="1.3rem" /></button>
                  <button className={styles.reject_button}><FaXmark size="1.3rem" /></button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}