"use client";

import { FaPlus } from "react-icons/fa6";
import styles from "./add-friend-button.module.scss"
import { User } from "@/api/models";
import { addFriendAction } from "@/actions/friends";

export default function AddFriendButton({ user, isFriend }: { user: User, isFriend: boolean }) {
  return !isFriend
    ? <button className={styles.add_friend_button} onClick={() => addFriendAction(user.user_id)}>
        <FaPlus/>
        Add friend
      </button>
    : <p className={styles.friend_msg}>{user.name} is your friend!</p>
}