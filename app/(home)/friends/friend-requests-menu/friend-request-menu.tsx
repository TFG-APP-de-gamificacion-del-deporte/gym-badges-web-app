"use client";

import styles from "./friend-request-menu.module.scss"
import { FaBell, FaCheck, FaCircle, FaXmark } from "react-icons/fa6";
import { addFriendAction, deleteFriendAction, getFriendRequestsAction } from "@/actions/friends";
import ProfilePicture from "@/components/profile-picture/profile-picture";
import Link from "next/link";
import useSWR from "swr";

export default function FriendRequestsMenu() {
  const { data: friendRequests, error, isLoading } = useSWR("getFriendRequestsAction", getFriendRequestsAction, { refreshInterval: 5000 });

  return (
    <>
      {/* FRIEND REQUESTS BUTTON */}
      {/* @ts-ignore  */}
      <button className={styles.friend_requests_button} popovertarget="friend-requests-popover">
        <FaBell size="1.3rem" ></FaBell>
        {friendRequests?.length !== undefined && friendRequests?.length > 0 && <FaCircle size="0.7rem" className={styles.red_dot} />}
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
          {friendRequests && friendRequests.map(friendReq =>
            <div className={styles.friend} key={friendReq.user_id}>
              <div className={styles.avatar}>
                {/* IMAGE, NAME AND USERNAME */}
                <div className={styles.image_container}>
                  <ProfilePicture image_b64={friendReq.image} />
                </div>
                <Link href={`user/${friendReq.user_id}`} className={styles.username}>
                  {friendReq.name}<br /><small>{friendReq.user_id}</small>
                </Link>
                <div className={styles.accept_reject_buttons}>
                  <button className={styles.accept_button} onClick={() => addFriendAction(friendReq.user_id)}>
                    <FaCheck size="1.3rem" />
                  </button>
                  <button className={styles.reject_button} onClick={() => deleteFriendAction(friendReq.user_id)}>
                    <FaXmark size="1.3rem" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {friendRequests?.length === 0 && "You have no friend requests."}
      </div>
    </>
  )
}